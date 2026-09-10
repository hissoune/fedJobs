import Svg, { Circle, Path, Rect, SvgProps } from 'react-native-svg';
const icons = {
  home: (props: any) => (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        d="M3 10.5L12 3l9 7.5V21H3V10.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </Svg>
  ),

  explore: (props: any) => (
    <Svg viewBox="0 0 24 24" {...props}>
      <Circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <Path
        d="M15 9l-2 4-4 2 2-4 4-2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </Svg>
  ),

  
};
export default function SvgComponent(props: SvgProps) {
  return (
    <Svg height="50%" width="50%" viewBox="0 0 100 100" {...props}>
      {/* <Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="2.5" fill="green" />
      <Rect x="15" y="15" width="70" height="70" stroke="red" strokeWidth="2" fill="yellow" /> */}
      <Path
        d="M3 10.5L12 3l9 7.5V21H3V10.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </Svg>
  );
}
