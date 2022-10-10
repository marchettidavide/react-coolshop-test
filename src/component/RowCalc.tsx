import React from 'react';
import {Button, Grid, MenuItem, Select, TextField} from "@mui/material";
import {Row} from "../model/interface";

interface MyProps {
    obj: Row;
    valueCallback: any;
    operatorCallback: any;
    removeCallback: any;
    disabledCallback: any;
    totalObj: number;
}

interface MyState {
    obj: Row;
}

class RowCalc extends React.Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            obj: this.props.obj
        }
    }

    componentDidUpdate(prevProps:any) {
        if (this.props.obj !== prevProps.obj) {
            this.setState({obj:this.props.obj})
        }
    }

    valueInput(value: any) {
        value = value === NaN || value === "" || value === null ? 0 : value;
        this.state.obj.row.value = parseInt(value);
        this.props.valueCallback(this.state.obj);
    }

    operatorChange(value: any) {
        this.state.obj.row.operator = value;
        this.props.operatorCallback(this.state.obj);
    }

    removeRow(id: number) {
        this.props.removeCallback(id);
    }

    disabledRow(id: number) {
        this.props.disabledCallback(id);
    }

    render() {
        return (
            <Grid container
                  marginBottom={2}
                  marginTop={2}
                  padding={1}
                  borderRadius={2}
                  id={`container-row-${this.state.obj.id}`}
                  style={this.state.obj.row.disable ? {background: "grey"} : {background: "unset"}}>
                <Grid item xs={2}
                      id={`row-${this.state.obj.id}`}>
                    <Select labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.obj.row.operator}
                            label="Age" onChange={(e) => this.operatorChange(e.target.value)}
                            disabled={this.state.obj.row.disable}
                    >
                        <MenuItem value={"plus"} selected={true} id={"plus"}>+</MenuItem>
                        <MenuItem value={"minus"} selected={this.state.obj.row.operator === "minus"} id={"minus"}>-</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={6} id={`row-${this.state.obj.id}`}>
                    <TextField type={"number"}
                               inputProps={{min: 0, max: 100}}
                               value={this.state.obj.row.value}
                               onChange={(e) => this.valueInput(e.target.value)}
                               fullWidth={true}
                               disabled={this.state.obj.row.disable}
                    />
                </Grid>
                <Grid item xs={2} id={`row-${this.state.obj.id}`} style={{display: "flex", justifyContent: "center"}}>
                    <Button variant="contained" onClick={() => this.removeRow(this.state.obj.id)}
                            disabled={this.props.totalObj === 1 || this.state.obj.row.disable}>DELETE</Button>
                </Grid>
                <Grid item xs={2} id={`row-${this.state.obj.id}`} style={{display: "flex", justifyContent: "center"}}>
                    <Button variant="contained" onClick={() => this.disabledRow(this.state.obj.id)}
                            disabled={this.props.totalObj === 1}>{this.state.obj.row.disable ? "ENABLE" : "DISABLE"}</Button>
                </Grid>
            </Grid>
        );
    }
}

export default RowCalc;
