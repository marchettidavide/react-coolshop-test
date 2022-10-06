import React from 'react';
import {Grid} from "@mui/material";

interface MyProps {
    obj: any;
    valueCallback:any;
    operatorCallback:any;
    removeCallback:any
    totalObj:number
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
        console.log('this.props',this.props)
        this.state={
            obj: nextProps.obj
        }
    }

    valueInput(value: string){
        console.log(value)
        this.state.obj.row.value = parseInt(value);
        this.props.valueCallback(this.state.obj);
    }

    operatorChange(value:any){
        console.log('operatoir',value)
        this.state.obj.row.operator = value;
        this.props.operatorCallback(this.state.obj);
    }

    removeRow(id:number){
        this.props.removeCallback(id);
    }

    render() {
        return (
            <Grid container marginBottom={2} marginTop={2}>
                <Grid item xs={2} id={`row-${this.state.obj.id}`}>
                    <select onChange={(e) =>this.operatorChange(e.target.value)}>
                        <option value={"plus"} selected={this.state.obj.row.operator === "plus"}>
                        +
                        </option>
                        <option value={"minus"} selected={this.state.obj.row.operator === "minus"}>
                            -
                        </option>
                    </select>
                </Grid>
                <Grid item xs={7} id={`row-${this.state.obj.id}`}>
                    <input type={"number"} value={this.state.obj.row.value} onChange={(e) =>this.valueInput(e.target.value)} min={1} max={1000}/>
                </Grid>
                <Grid item xs={3} id={`row-${this.state.obj.id}`}>
                    <input type={"button"} value={'DELETE'} onClick={() =>this.removeRow(this.state.obj.id)} disabled={this.props.totalObj === 1}/>
                </Grid>
            </Grid>
        );
    }
}

export default RowCalc;
