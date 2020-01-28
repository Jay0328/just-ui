import { configure, addParameters } from '@storybook/react';
import './storybook.scss';

configure(require.context('../src', true, /\.stories\.tsx?$/), module);
