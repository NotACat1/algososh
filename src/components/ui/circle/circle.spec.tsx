import React from 'react';
import { render } from '@testing-library/react';
import { Circle } from './circle';
import { ElementStates } from 'types/element-states';

describe('Circle component', () => {
  test('renders correctly without letter', () => {
    const tree = render(<Circle />);
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with letter', () => {
    const tree = render(<Circle letter="A" />);
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with head', () => {
    const tree = render(<Circle head="Head" />);
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with react element in head', () => {
    const head = <span>React Element in Head</span>;
    const tree = render(<Circle head={head} />);
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with tail', () => {
    const tree = render(<Circle tail="Tail" />);
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with react element in tail', () => {
    const tail = <span>React Element in Tail</span>;
    const tree = render(<Circle tail={tail} />);
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with index', () => {
    const tree = render(<Circle index={42} />);
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with isSmall prop set to true', () => {
    const tree = render(<Circle isSmall={true} />);
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly in default state', () => {
    const tree = render(<Circle state={ElementStates.Default} />);
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly in changing state', () => {
    const tree = render(<Circle state={ElementStates.Changing} />);
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly in modified state', () => {
    const tree = render(<Circle state={ElementStates.Modified} />);
    expect(tree).toMatchSnapshot();
  });
});
