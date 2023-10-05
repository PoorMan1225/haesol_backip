import React, { VFC } from 'react';
import {
  AdminContents,
  AdminGridWrap,
  AdminLayout,
  BoardHeader,
  BoardInformation,
  Button,
  InputText,
  Select,
} from './styles';
import Grid from '@components/Grid';

interface Props {
  components: JSX.Element[];
}

const TabPage: VFC<Props> = ({ components }) => {
  return <AdminContents className="headerY">{components}</AdminContents>;
};

export default TabPage;
