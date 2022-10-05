import React from 'react';
import RowCalc from "./component/RowCalc";
import {Button} from "@mui/material";
interface MyProps {
};

interface MyState {
    rowCalc:Array<any>
};

class App extends React.Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            rowCalc:[{
                id: 0,
                row: {
                    operator: "plus",
                    value: "1",
                    disable:false
                }
            }]
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
                value: "1",
                disable:false
            }
        }
        this.state.rowCalc.push(data);
        this.setState({
            rowCalc: this.state.rowCalc
        }, () => {
            this.calculateTotal()
        });
    }
    removeRow = (idRow:number) => {
        let removeRow = this.state.rowCalc.filter((x: any) => x.id !== idRow);
        console.log('removeRow->',removeRow)
        this.setState({rowCalc: removeRow}, () => {})
    }

    valueChange= (obj:any) =>{
        this.state.rowCalc.filter((x: any) => {
            if (x.id === obj.id) {
                x.value = obj.value
            }
        });
        this.calculateTotal()
        // this.setState({
        //     rowCalc: this.state.rowCalc
        // }, () => {
        //     this.calculateTotal()
        // });
        console.log('obj in app',obj)
        console.log('this.state.rowCalc',this.state.rowCalc)

    }
    calculateTotal = ()=>{
        let total = 0;
        this.state.rowCalc.map((x:any)=>{
            if(x.row.operator === "plus"){
                total = total + parseInt(x.row.value)
            }else{
                total = total - parseInt(x.row.value)
            }
        })
        console.log(total)
    }

    render() {
        return (
            <div className={'app-container'}>
                <input type={"button"} onClick={this.addRow} value={"aggiungi riga"}/>
                ciao
                {
                    this.state.rowCalc.map((infoRow: any, index: number) =>
                        <div className={'ciaop'}>
                            <RowCalc valueCallback={this.valueChange}
                                     obj={infoRow}
                            ></RowCalc>
                            <input type={"button"} value={'DELETE'} onClick={() =>this.removeRow(infoRow.id)}/>
                        </div>

                  )
                }
            </div>
        );
    }
}

export default App;
