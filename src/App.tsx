import React from 'react';
import RowCalc from "./component/RowCalc";
import {Button, Container, Grid} from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Row} from "./model/interface";

interface MyProps {
}

interface MyState {
    rowCalc: Array<Row>;
    total: number;
}

class App extends React.Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            rowCalc: [{
                id: 0,
                row: {
                    operator: "plus",
                    value: 0,
                    disable: false
                }
            }],
            total: 0
        }
    }

    addRow = () => {
        const ids = this.state.rowCalc.map((object: Row) => {
            return object.id;
        });
        const max = Math.max(...ids);
        let data: Row = {
            id: max + 1,
            row: {
                operator: "plus",
                value: 0,
                disable: false
            }
        }
        this.state.rowCalc.push(data);
        this.setState({
            rowCalc: this.state.rowCalc
        });
    }

    removeRow = (idRow: number) => {
        const removeRow = this.state.rowCalc.filter((x: Row) => x.id !== idRow);
        this.setState({rowCalc: removeRow}, () => {
            this.calculateTotal()
        })
    }

    disabledRow = (idRow: number) => {
        this.state.rowCalc.map((x: Row) => {
            if (x.id === idRow) {
                x.row.disable = !x.row.disable
            }
        });
        this.setState({rowCalc: this.state.rowCalc}, () => {
            this.calculateTotal()
        })
    }

    valueChange = (obj: any) => {
        this.state.rowCalc.map((x: any) => {
            if (x.id === obj.id) {
                x.row.value = obj.row.value
            }
        });
        this.setState({rowCalc: this.state.rowCalc}, () => {
            this.calculateTotal()
        })
    }

    operatorChange = (obj: Row) => {
        this.state.rowCalc.map((x: Row) => {
            if (x.id === obj.id) {
                x.row.operator = obj.row.operator
            }
        });
        this.setState({rowCalc: this.state.rowCalc}, () => {
            this.calculateTotal()
        })
    }

    calculateTotal = () => {
        let totale = 0
        this.state.rowCalc.forEach((x: Row) => {
            if (x.row.operator === "plus" && !x.row.disable) {
                totale += x.row.value
            } else if (x.row.operator === "minus" && !x.row.disable) {
                totale -= x.row.value
            }
        })
        this.setState({total: totale})
    }

    render() {
        return (
            <Container maxWidth="sm" className={"app-container"}>
                <Grid container>
                    <Grid item xs={12} textAlign={"center"}>
                        <h1>React Challenge</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={this.addRow}>Add Row</Button>
                    </Grid>
                </Grid>
                {
                    this.state.rowCalc.map((infoRow: Row, index: number) =>
                        <RowCalc valueCallback={this.valueChange}
                                 operatorCallback={this.operatorChange}
                                 removeCallback={this.removeRow}
                                 disabledCallback={this.disabledRow}
                                 obj={infoRow}
                                 totalObj={this.state.rowCalc.length}
                                 key={index}
                        ></RowCalc>
                    )
                }
                <Grid container>
                    <Grid item xs={12}>
                        <h1>Total: {this.state.total}</h1>
                    </Grid>
                </Grid>

            </Container>
        );
    }
}

export default App;
