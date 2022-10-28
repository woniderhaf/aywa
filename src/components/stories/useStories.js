import {useEffect, useState} from 'react';

const results = [
  {
    _id: '2324123',
    image: require('../../screens/Main/Images/stories/1.png'),
  },
  {
    _id: '23211234123',
    image: require('../../screens/Main/Images/stories/2.png'),
  },
  {
    _id: '123333',
    image: require('../../screens/Main/Images/stories/1.png'),
  },
  {
    _id: '8764324',
    image: require('../../screens/Main/Images/stories/2.png'),
  },
  {
    _id: '123776',
    image: require('../../screens/Main/Images/stories/1.png'),
  },
  {
    _id: '123335',
    image: require('../../screens/Main/Images/stories/2.png'),
  },
  {
    _id: '575353',
    image: require('../../screens/Main/Images/stories/1.png'),
  },
  {
    _id: '2347',
    image: require('../../screens/Main/Images/stories/2.png'),
  },
];

export const useStories = () => {
  const [stories, setStories] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // получаем с админки истории
    setStories(results);
  }, []);

  return {stories, isLoading};
};
