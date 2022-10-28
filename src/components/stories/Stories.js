import {ScrollView, TouchableOpacity, Image, StyleSheet} from 'react-native';
import StoryItem from './StoryItem';
import {useStories} from './useStories';

const Stories = () => {
  const {stories, isLoading} = useStories();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {stories.map(v => (
        <StoryItem story={v} key={v._id} />
      ))}
    </ScrollView>
  );
};
export default Stories;
