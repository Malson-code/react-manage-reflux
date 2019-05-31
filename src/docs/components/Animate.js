/**
 *   Create by Malson on 2018/6/1
 */
import React from 'react';
import QueueAnim from 'rc-queue-anim';

class Animate extends React.Component{
  render(){
    let {type} = this.props;
    let defaultChange = [
      { opacity: [1, 0], translateY: [0, 20] },
      { opacity: [1, 0], translateY: [0, -20] }
    ];
    let showChange = type==='right'?[
      { opacity: [1, 0], translateX: [0, 20] },
      { opacity: [1, 0], translateX: [0, -20] }
    ]:defaultChange
    return(
        <QueueAnim className="demo-content" animConfig={showChange}>
          { this.props.children }
        </QueueAnim>
    )
  }
}
export default Animate;