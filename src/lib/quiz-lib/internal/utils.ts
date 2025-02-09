import React, { ReactNode } from "react";

export function debounce<T extends Function>(fn: T, delay = 250): T {
  let timeout: number | undefined;

  // @ts-expect-error
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      return fn(...args);
    }, delay) as unknown as number;
  };
}

export function omit<T extends object, K extends keyof T>(obj: T, keyToOmit: K): Omit<T, K> {
  const { [keyToOmit]: _, ...rest } = obj;
  return rest;
}

export function getPosInBounds(
  idx: number,
  bounds: readonly [number, number]
): "left" | "right" | "inside" {
  if (idx < bounds[0]) {
    return "left";
  }
  if (idx >= bounds[1]) {
    return "right";
  }
  return "inside";
}

export function ChildrenArr(children?: React.ReactNode | null): React.ReactElement[] {
  return flattenChildren(children);
}

export function flattenChildren(children: ReactNode): React.ReactElement[] {
  let flattenedChildren: React.ReactElement[] = [];

  const flatten = (childArray: ReactNode) => {
    React.Children.forEach(childArray, (child) => {
      if (React.isValidElement(child)) {
        flattenedChildren.push(child);
      } else if (Array.isArray(child)) {
        flatten(child);
      } else if (typeof child === "object" && child !== null) {
        // We need to cast child to any because ReactNode includes objects which
        // are not valid elements that we want to include in the flattened array.
        flatten((child as any).props.children);
      }
    });
  };

  flatten(children);

  return flattenedChildren;
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function validateEmail(email: string): boolean {
  const string = email.trim();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(string);
}
