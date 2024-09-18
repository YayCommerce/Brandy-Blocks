/**
 * WordPress dependencies
 */

import { Content } from './edit';

export default function Save(props) {
  return <Content {...props} isSave={true} />;
}
