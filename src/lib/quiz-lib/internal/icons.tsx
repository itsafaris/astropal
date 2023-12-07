import { Icon } from "@chakra-ui/react";
import { ComponentProps } from "react";

export function CheckIcon(props: ComponentProps<typeof Icon>) {
  return (
    <Icon viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x={7.5} y={7.5} width={49} height={49} rx={6.5} stroke="currentColor" strokeWidth={5} />
      <path d="M15 32.826L27.28 45 50 17" stroke="currentColor" strokeWidth={6} />
    </Icon>
  );
}
export function CheckIconEmpty(props: ComponentProps<typeof Icon>) {
  return (
    <Icon viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x={7.5} y={7.5} width={49} height={49} rx={6.5} stroke="currentColor" strokeWidth={5} />
    </Icon>
  );
}

export function RadioIconEmpty(props: ComponentProps<typeof Icon>) {
  return (
    <Icon viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x={7.5} y={7.5} width={49} height={49} rx={24.5} stroke="#000" strokeWidth={5} />
    </Icon>
  );
}
export function RadioIcon(props: ComponentProps<typeof Icon>) {
  return (
    <Icon viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x={7.5} y={7.5} width={49} height={49} rx={24.5} stroke="#000" strokeWidth={5} />
      <rect x={16} y={16} width={32} height={32} rx={16} fill="#000" />
    </Icon>
  );
}
