import stringImage from 'images/string.svg';
import stringHoverImage from 'images/string-hover.svg';

import fibonacciImage from 'images/fibonacci.svg';
import fibonacciHoverImage from 'images/fibonacci-hover.svg';

import arrImage from 'images/arr.svg';
import arrHoverImage from 'images/arr-hover.svg';

import stackImage from 'images/stack.svg';
import stackHoverImage from 'images/stack-hover.svg';

import queueImage from 'images/queue.svg';
import queueHoverImage from 'images/queue-hover.svg';

import listImage from 'images/list.svg';
import listHoverImage from 'images/list-hover.svg';

const cardsData = [
  {
    image: stringImage,
    imageHover: stringHoverImage,
    to: 'recursion',
  },
  {
    image: fibonacciImage,
    imageHover: fibonacciHoverImage,
    to: 'fibonacci',
  },
  {
    image: arrImage,
    imageHover: arrHoverImage,
    to: 'sorting',
  },
  {
    image: stackImage,
    imageHover: stackHoverImage,
    to: 'stack',
  },
  {
    image: queueImage,
    imageHover: queueHoverImage,
    to: 'queue',
  },
  {
    image: listImage,
    imageHover: listHoverImage,
    to: 'list',
  },
];

export { cardsData };
