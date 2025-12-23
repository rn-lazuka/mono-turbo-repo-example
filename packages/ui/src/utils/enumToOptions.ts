import type { ElementType } from 'react';

export interface EnumWithIconsMap {
  [key: string]: ElementType;
}

export interface OptionWithIcon<T extends string = string> {
  name: string;
  value: T;
  icon?: ElementType;
}

export const enumToOptions = <T extends string>(
  enumObj: Record<string, T>,
  iconsMap?: EnumWithIconsMap
): OptionWithIcon<T>[] => {
  return Object.values(enumObj).map((value) => ({
    name: value,
    value,
    icon: iconsMap?.[value],
  }));
};

export const arrayToOptions = <T extends string>(
  array?: T[],
  iconsMap?: EnumWithIconsMap,
  defaultIcon?: ElementType
): OptionWithIcon<T>[] => {
  if (!array) return [];
  return array.map((value) => ({
    name: value,
    value,
    icon: iconsMap?.[value.toUpperCase()] ?? defaultIcon,
  }));
};
