import React from 'react';

interface MyProps {
    obj: any;
    valueCallback:any;
};

interface MyState {
    obj: any;
};

class RowCalc extends React.Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);
        this.state={
            obj:this.props.obj
        }

    }

    componentWillReceiveProps(nextProps: any) {
        console.log('nextProps',nextProps)
    }

    valueInput(value: string){
        console.log(value)
        this.props.obj.value = value;
        this.props.valueCallback(this.props.obj);
    }

    render() {
        return (
            <div id={this.props.obj.id}>
                {this.props.obj.row.value}
                {this.props.obj.row.operator}
                <select>
                    <option value={"plus"} selected={this.props.obj.row.operator === "plus"}>
                    +
                    </option>
                    <option value={"minus"} selected={this.props.obj.row.operator === "minus"}>
                        -
                    </option>
                </select>
                <input type={"number"} value={this.props.obj.row.value} onChange={(e) =>this.valueInput(e.target.value)}/>
            </div>

        );
    }
}

export default RowCalc;
