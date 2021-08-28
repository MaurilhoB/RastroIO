import React, { createContext, useCallback, useContext } from 'react';
import { v4 as uuid } from 'uuid';

import ICreatePackageDTO from '../dtos/ICreatePackageDTO';
import { IDropFromDTO } from '../dtos/IDropFromDTO';

import usePersistedState from './usePersistedState';

interface IPackage {
  id: string;
  title: string;
  code: string;
  events: [];
}

interface IPackages {
  tracking: IPackage[];
  archived: IPackage[];
  delivered: IPackage[];
}

interface PackagesContextData {
  create(data: ICreatePackageDTO): void;
  dropFrom(data: IDropFromDTO): void;
  findCodeById(id: string): string;
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
        tracking: [...prev.tracking, { id: uuid(), title, code, events: [] }],
      }));
    },
    [setPackages],
  );

  const dropFrom = useCallback(
    ({ id, key }: IDropFromDTO): void => {
      const filteredPackages = packages[key].filter(item => item.id !== id);
      setPackages(prev => ({
        ...prev,
        [key]: filteredPackages,
      }));
    },
    [packages, setPackages],
  );

  const findCodeById = useCallback((id: string): string => {
    const findIndex = packages.tracking.findIndex(item => item.id === id);
    return packages.tracking[findIndex]?.code;
  }, []);

  return (
    <PackagesContext.Provider
      value={{ create, packages, dropFrom, findCodeById }}
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
