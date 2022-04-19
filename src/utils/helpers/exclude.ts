//This functions takes an object and deletes a list of entities from the object
export function exclude<Entity, Key extends keyof Entity>(
  entity: Entity,
  ...keys: Key[]
): Omit<Entity, Key> {
  for (const key of keys) {
    delete entity[key];
  }
  return entity;
}
