import * as React from 'react';
import Tree from 'react-d3-tree';
import { RawNodeDatum } from 'react-d3-tree/lib/types/common';

export interface HierarchicalTreeVisualizationProps {
  data: RawNodeDatum
}

const HierarchicalTreeVisualization = (props: HierarchicalTreeVisualizationProps) => {
  return (
    (props.data ? 
      <div id="treeWrapper" style={{ width: '50em', height: '50em' }}>
        <Tree
          data={props.data}
          rootNodeClassName="node__root" 
          branchNodeClassName="node__branch" 
          leafNodeClassName="node__leaf" 
          orientation={"vertical"}
          nodeSize={{x:100, y:100}}
          translate={{x: 200, y:100}}
        />
      </div> 
    : <div></div>)
  );
};

export default HierarchicalTreeVisualization;
