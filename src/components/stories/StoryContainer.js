import {View} from 'react-native';
import {useData} from '../../hooks/useData';
import {StoryContainer as SC} from 'react-native-stories-view';
const StoryContainer = () => {
  const {activeStories, setActiveStories} = useData();
  return (
    activeStories && (
      <SC
        visible
        enableProgress
        images={[require('./2.jpg').src, require('./1.webp').src]}
        duration={20}
        onComplete={() => setActiveStories(null)}
        containerStyle={{width: '100%', height: '100%'}}
      />
    )
  );
};
export default StoryContainer;
