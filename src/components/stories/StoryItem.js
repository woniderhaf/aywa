import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useData} from '../../hooks/useData';

export default StoryItem = ({story}) => {
  const {setActiveStories} = useData();
  return (
    <TouchableOpacity style={s.story} onPress={() => setActiveStories(story)}>
      <Image source={story.image} style={s.storyImage} />
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  story: {
    borderRadius: 24,
    borderColor: '#242424',
    borderWidth: 1,
    padding: 4,
    marginHorizontal: 6,
  },
  storyActive: {
    borderColor: 'rgb(160, 59, 239)',
  },
  storyImage: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: 'gray',
  },
});
