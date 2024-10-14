import {useWindowDimensions, SafeAreaView, Text} from 'react-native';

export const Screen = ({children}: {children: string}) => {
  const {width} = useWindowDimensions();
  const scale = width / 1920;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 102 * scale}}>{children}</Text>
    </SafeAreaView>
  );
};
