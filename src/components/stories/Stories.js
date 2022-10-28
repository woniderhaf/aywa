import {useMemo, useState} from 'react';
import {Dimensions} from 'react-native';
import InstaStory from 'react-native-insta-story';
import {Http, Storage} from '../../helpers/Index';

const Stories = props => {
  const StoriesFormatter = useMemo(
    () =>
      props.stories.map(item => {
        return {
          _id: item._id,
          stories: item.stories.map(item => ({story_image: item.image})),
          user_image: item.storyImage,
          user_name: item.themeStory,
          seen: item.seen,
        };
      }),
    [],
  );
  const [stories, setStories] = useState(StoriesFormatter);
  const [startStoryId, setStartStoryId] = useState(null);
  const onStartStory = async item => {
    setStartStoryId(item.user_id);
    if (!props.user.seenStories.find(story => story === item._id)) {
      const res = await Http.put('story/view', {
        userId: props.user._id,
        story: item,
      });
      props.setUser({
        ...props.user,
        seenStories: [...props.user.seenStories, item._id],
      });
    }
  };

  const SeenStories = closeStoryId => {
    const startElement = stories.findIndex(
      item => item.user_id === startStoryId,
    );
    const closeElement = stories.findIndex(
      item => item.user_id === closeStoryId,
    );
    const seenStories = stories.slice(startElement, closeElement + 1);
    const seenElements = seenStories.map(item => ({...item, seen: true}));
    const res = [
      ...stories.slice(0, startElement),
      ...stories.slice(closeElement + 1, stories.length),
      ...seenElements,
    ];
  };
  return (
    // <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <InstaStory
      data={stories}
      duration={10}
      unPressedBorderColor={'#A03BEF'}
      pressedBorderColor={'#242424'}
      onStart={onStartStory}
      onClose={item => SeenStories(item.user_id)}
      customCloseComponent={<></>}
    />
    /* {stories.map(v => (
        <StoryItem story={v} key={v._id} />
      ))} */
    // </ScrollView>
  );
};
const {height, width} = Dimensions.get('window');
export default Stories;
