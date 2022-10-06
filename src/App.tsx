import React from 'react';
import RowCalc from "./component/RowCalc";
import {Box, Button, Container, Grid} from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

interface MyProps {
};

interface MyState {
    rowCalc:Array<any>;
    total: number;
};

class App extends React.Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            rowCalc:[{
                id: 0,
                row: {
                    operator: "plus",
                    value: 0,
                    disable:false
                }
            }],
            total:0
        }

    }

    addRow = () => {
        const ids = this.state.rowCalc.map((object: any) => {
            return object.id;
        });
        const max = Math.max(...ids);
        let data: any = {
            id: max + 1,
            row: {
                operator:"plus",
                value: 0,
                disable:false
            }
        }
        this.state.rowCalc.push(data);
        this.setState({
            rowCalc: this.state.rowCalc
        }, () => {
           // this.calculateTotal()
        });
    }
    removeRow = (idRow:number) => {
        const removeRow = this.state.rowCalc.filter((x: any) => x.id !== idRow);
        console.log('removeRow->',removeRow)
        this.setState({rowCalc: removeRow}, () => {
            this.calculateTotal()
        })
    }

    valueChange = (obj:any) =>{
        this.state.rowCalc.map((x: any) => {
            if (x.id === obj.id) {
                x.row.value = obj.row.value
            }
        });
        this.setState({rowCalc: this.state.rowCalc}, () => {
              this.calculateTotal()
        })
    }

    operatorChange = (obj:any) =>{
        this.state.rowCalc.map((x: any) => {
            if (x.id === obj.id) {
                x.row.operator = obj.row.operator
            }
        });
        this.setState({rowCalc: this.state.rowCalc}, () => {
            this.calculateTotal()
        })
    }

    calculateTotal = ()=>{
        console.log('this.state.rowCalc in calculate->', this.state.rowCalc)
        let totale = 0
        this.state.rowCalc.forEach((x:any)=>{
            if(x.row.operator === "plus"){
                totale += x.row.value
                // console.log('totale+->', totale)
                // console.log('x.row.value->', x.row.value)
            }else{
                totale -= x.row.value
            }
        })
        //console.log('totale->', totale)
        this.setState({total: totale}, () => {
            console.log('totale->', this.state.total)
        })

    }

    render() {
        return (
            <Container maxWidth="sm" className={"app-container"}>
                <Grid container>
                    <Grid item xs={12} textAlign={'center'}>
                        <h1>React Challenge</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={this.addRow}>Add Row</Button>
                        {/*<input type={"button"} onClick={this.addRow} value={"aggiungi riga"}/>*/}
                    </Grid>
                </Grid>
                        {
                            this.state.rowCalc.map((infoRow: any, index: number) =>
                                    <RowCalc valueCallback={this.valueChange}
                                             operatorCallback={this.operatorChange}
                                             removeCallback={this.removeRow}
                                             obj={infoRow}
                                             totalObj={this.state.rowCalc.length}
                                    ></RowCalc>
                            )
                        }
                <Grid container>
                    <Grid item xs={12}>
                        totale {this.state.total}
                    </Grid>
                </Grid>

            </Container>
        );
    }
}

export default App;
