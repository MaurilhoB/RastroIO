import React, { createContext, useCallback, useContext } from 'react';
import { v4 as uuid } from 'uuid';

import ICreatePackageDTO from '../dtos/ICreatePackageDTO';
import usePersistedState from './usePersistedState';

interface TrackEvent {
  data: string;
  hora: string;
  descricao: string;
  criacao: string;
  unidade: {
    tipounidade: string;
    cidade: string;
    uf: string;
  };
}

interface IPackage {
  id: string;
  title: string;
  code: string;
  events: TrackEvent[];
  updated_at: string;
  hasUpdate: boolean;
}

interface IPackages {
  tracking: IPackage[];
  archived: IPackage[];
  delivered: IPackage[];
}

interface PackagesContextData {
  create(data: ICreatePackageDTO): void;
  drop(id: string): void;
  findById(id: string): IPackage | undefined;
  update(data: IPackage): IPackage;
  moveTo(id: string, to: 'tracking' | 'delivered' | 'archived'): void;
  getPackageKey(id: string): keyof IPackages | undefined;
  packages: IPackages;
}

const PackagesContext = createContext<PackagesContextData>(
  {} as PackagesContextData,
);

const PackagesProvider: React.FC = ({ children }) => {
  const [packages, setPackages] = usePersistedState<IPackages>(
    '@RastroIO:packages',
    {
      tracking: [],
      delivered: [],
      archived: [],
    },
  );

  const create = useCallback(
    ({ title, code }: ICreatePackageDTO) => {
      setPackages(prev => ({
        ...prev,
        tracking: [
          ...prev.tracking,
          {
            id: uuid(),
            title,
            code,
            updated_at: new Date().toISOString(),
            hasUpdate: false,
            events: [],
          },
        ],
      }));
    },
    [setPackages],
  );

  const drop = useCallback(
    (id: string): void => {
      setPackages(prev => {
        const fromKey = Object.keys(prev).find(key => {
          const findIndex = prev[key as keyof IPackages].findIndex(
            packageData => packageData.id === id,
          );

          if (findIndex !== -1) {
            return true;
          }
          return false;
        }) as keyof IPackages;

        if (fromKey) {
          const updatedPackages = prev[fromKey].filter(
            packageData => packageData.id !== id,
          );

          return {
            ...prev,
            [fromKey]: updatedPackages,
          };
        }

        return prev;
      });
    },
    [setPackages],
  );

  const findById = useCallback(
    (id: string): IPackage | undefined => {
      let result: IPackage | undefined;

      setPackages(prev => {
        const { tracking, delivered, archived } = prev;

        const trackingIndex = tracking.findIndex(item => item.id === id);

        if (trackingIndex > -1) {
          result = tracking[trackingIndex];
          return prev;
        }

        const deliveredIndex = delivered.findIndex(item => item.id === id);

        if (deliveredIndex > -1) {
          result = delivered[deliveredIndex];
          return prev;
        }

        const archivedIndex = archived.findIndex(item => item.id === id);

        if (archivedIndex > -1) {
          result = archived[archivedIndex];
          return prev;
        }

        return prev;
      });

      return result;
    },
    [setPackages],
  );

  const update = useCallback(
    (data: IPackage): IPackage => {
      setPackages(prev => {
        const { tracking, delivered } = prev;

        const trackingIndex = tracking.findIndex(item => item.id === data.id);

        if (trackingIndex > -1) {
          const trackingPackages = [...tracking];
          trackingPackages[trackingIndex] = data;

          return {
            ...prev,
            tracking: trackingPackages,
          };
        }

        const deliveredIndex = delivered.findIndex(item => item.id === data.id);

        if (deliveredIndex > -1) {
          const deliveredPackages = [...delivered];
          deliveredPackages[deliveredIndex] = data;

          return {
            ...prev,
            delivered: deliveredPackages,
          };
        }

        return prev;
      });
      return data;
    },
    [setPackages],
  );
  const moveTo = useCallback(
    (id: string, to: 'tracking' | 'delivered' | 'archived') => {
      setPackages(prev => {
        let fromPackageIndex: number | undefined;

        const fromKey = Object.keys(prev).find(key => {
          const findIndex = prev[key as keyof IPackages].findIndex(
            packageData => packageData.id === id,
          );

          if (findIndex !== -1) {
            fromPackageIndex = findIndex;
            return true;
          }
          return false;
        }) as keyof IPackages;

        const updatedFromPackages = prev[fromKey].filter(
          item => item.id !== id,
        );

        if (fromKey === to) {
          return prev;
        }

        if (fromPackageIndex !== undefined && fromPackageIndex > -1) {
          const packageToInsert = prev[fromKey][fromPackageIndex];

          return {
            ...prev,
            [to]: [...prev[to], packageToInsert],
            [fromKey]: updatedFromPackages,
          };
        }
        return prev;
      });
    },
    [setPackages],
  );

  const getPackageKey = useCallback(
    (id: string) => {
      let result: keyof IPackages | undefined;

      setPackages(prev => {
        Object.keys(prev).find(key => {
          const findIndex = prev[key as keyof IPackages].findIndex(
            packageData => packageData.id === id,
          );

          if (findIndex !== -1) {
            result = key as keyof IPackages;
            return true;
          }
          return false;
        }) as keyof IPackages;

        return prev;
      });

      return result;
    },
    [setPackages],
  );
  return (
    <PackagesContext.Provider
      value={{
        create,
        packages,
        drop,
        findById,
        update,
        moveTo,
        getPackageKey,
      }}
    >
      {children}
    </PackagesContext.Provider>
  );
};

export default PackagesProvider;

export function usePackages() {
  const context = useContext(PackagesContext);

  if (!context) {
    throw new Error('You can use this hook just inside PackagesProvider');
  }

  return context;
}
