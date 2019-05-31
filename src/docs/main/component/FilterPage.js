/**
 *   Create by Malson on 2018/6/1
 */
import React from 'react';
import {Form, Input, Button, Row, Col} from 'antd';
import HandleChange from '../../../common/HandleChange';

const FormItem = Form.Item;

@HandleChange
class FilterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  init = () => {
    let totalInput = ['name', 'age'],
        validRules = [
          {
            id: 'name',//id
            desc: '姓名',//显示的字段名
            required: true,
            max: 20,
          },
          {
            id: 'age',
            desc: '年龄',//显示的字段名
            required: true
          }
        ];
    let {actions} = this.props;
    actions.initField(totalInput, validRules);
  };
  
  componentDidMount() {
    this.init();
  }
  
  search = () => {
    let obj = Object.assign({}, this.props.state.inputVal);
    this.props.search(obj);
  };
  reset = () => {
    this.init();
    this.props.reset();
  };
  
  render() {
    const formLayout = 'horizontal';
    const textLabel = {
      labelCol: {span: 8},
      wrapperCol: {span: 16}
    };
    const {validBackData, inputVal} = this.props.state;
    const {actions} = this.props;
    return (
        <div className='filter-wrap'>
          {/*需要form根据字段长短调节的  加上classnName 'flex-form'  或者单个加  'flex-form-item'*/}
          <Form layout={formLayout}>
            <Row>
              <Col span={6}>
                <FormItem
                    help={validBackData.nameHint}
                    validateStatus={validBackData.nameStatus}
                    label="姓名"
                    {...textLabel}
                >
                  <Input placeholder="输入姓名"
                         id='name'
                         onChange={actions.handleInputChange}
                         value={inputVal.name}
                  />
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem
                    help={validBackData.ageHint}
                    validateStatus={validBackData.ageStatus}
                    label="年龄"
                    {...textLabel}
                >
                  <Input placeholder="输入年龄"
                         id='age'
                         onChange={actions.handleInputChange}
                         value={inputVal.age}
                  />
                </FormItem>
              </Col>
              <Col span={6}>
                <Row>
                  <Col offset={4}>
                    <Button type='primary'
                            icon='search'
                            className='btn-margin filter-btn'
                            onClick={this.search}
                    >
                      查询
                    </Button>
                    <Button icon='sync' className='btn-margin filter-btn' onClick={this.reset}>重置</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </div>
    )
  }
}

export default FilterPage;