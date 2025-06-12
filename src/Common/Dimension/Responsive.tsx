import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;
const scaleSize = (size: number) => (width / BASE_WIDTH) * size;
const verticalScaleSize = (size: number) => (height / BASE_HEIGHT) * size;
const responsiveFontSize = (size: number) => {
  const scaleFactor = Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);
  return Math.round(size * scaleFactor);
};

const Responsive = {
  width: (size: number) => scaleSize(size),
  height: (size: number) => verticalScaleSize(size),
  fontSize: (size: number) => responsiveFontSize(size),
  margin: (size: number) => scaleSize(size),
  padding: (size: number) => scaleSize(size),
  borderRadius: (size: number) => scaleSize(size),
};

export default Responsive;
