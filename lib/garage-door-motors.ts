import type { Translator } from '@/lib/i18n/get-dictionary';

export const GARAGE_DOOR_MOTOR_TYPES = [
  'standard',
  'fast',
  'load-sensor',
] as const;

export type GarageDoorMotorType = (typeof GARAGE_DOOR_MOTOR_TYPES)[number];

export function isGarageDoorMotorType(
  value: string,
): value is GarageDoorMotorType {
  return GARAGE_DOOR_MOTOR_TYPES.includes(value as GarageDoorMotorType);
}

export function getGarageDoorMotorLabel(
  motor: GarageDoorMotorType,
  t: Translator,
): string {
  return t(`wizard.garageDoor.options.motor.types.${motor}.title`);
}

export const GARAGE_DOOR_MOTOR_OPTIONS: {
  id: GarageDoorMotorType;
  titleKey: `wizard.garageDoor.options.motor.types.${GarageDoorMotorType}.title`;
  descriptionKey: `wizard.garageDoor.options.motor.types.${GarageDoorMotorType}.description`;
  priceHintKey: `wizard.garageDoor.options.motor.types.${GarageDoorMotorType}.priceHint`;
}[] = [
  {
    id: 'standard',
    titleKey: 'wizard.garageDoor.options.motor.types.standard.title',
    descriptionKey: 'wizard.garageDoor.options.motor.types.standard.description',
    priceHintKey: 'wizard.garageDoor.options.motor.types.standard.priceHint',
  },
  {
    id: 'fast',
    titleKey: 'wizard.garageDoor.options.motor.types.fast.title',
    descriptionKey: 'wizard.garageDoor.options.motor.types.fast.description',
    priceHintKey: 'wizard.garageDoor.options.motor.types.fast.priceHint',
  },
  {
    id: 'load-sensor',
    titleKey: 'wizard.garageDoor.options.motor.types.load-sensor.title',
    descriptionKey: 'wizard.garageDoor.options.motor.types.load-sensor.description',
    priceHintKey: 'wizard.garageDoor.options.motor.types.load-sensor.priceHint',
  },
];
