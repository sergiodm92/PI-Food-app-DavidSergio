import React from 'react';
import { Link } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Card from './Card';

Enzyme.configure({ adapter: new Adapter() });

describe('<Card />', () => {
    let wrapper;
    let title = "milanesas";
    let id = 1;
    let score = 90;
    let healthScore = 80;
    beforeEach(() => {
        wrapper = shallow(<Card id={id} title={title} score={score} healthScore={healthScore} />);
    })

    it('should render three <Link />', () => {
        expect(wrapper.find(Link)).toHaveLength(1);
    });

    it('should render five <div>', () => {
        expect(wrapper.find('div')).toHaveLength(5);
      })

      it('should render an h1 with title passed by props', () => {
        expect(wrapper.find('h1')).toHaveLength(1);
      })
   

});