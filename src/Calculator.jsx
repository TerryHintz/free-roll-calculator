import React, {Component} from 'react';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

class Calculator extends Component {
    state = {
        american: undefined,
        implied: undefined,
        americanOpp: undefined,
        impliedOpp: undefined,
        rows: [],
        moneyDog: 100,
    }
    
    componentDidMount() {
        
    }

    handleChangeAmerican = (event) => {
        this.calculateImpliedOdds(event.target.value, false);
        this.setState({american: event.target.value});
    }

    handleChangeAmericanOpp = (event) => {
        this.calculateImpliedOdds(event.target.value, true);
        this.setState({americanOpp: event.target.value});
    }

    handleChangeDog = (event) => {
        this.setState({moneyDog: event.target.value});
    }

    calculateImpliedOdds = (american, isOpp) => {
        if (!american){
            return;
        }
        american = Number(american);
        let implied;
        if (american >= 0) {
            implied = 100 / (american + 100) * 100;
        } else {
            implied = -american / (-american + 100) * 100;
        }
        if(isOpp){
            this.setState({impliedOpp: implied});
        } else {
            this.setState({implied});
        }
    }

    generateReport = () => {
        let americanFav;
        let americanDog;
        if(this.state.american > 0){
            americanDog = Number(this.state.american);
            americanFav = Number(this.state.americanOpp);
        } else {
            americanDog = Number(this.state.americanOpp);
            americanFav = Number(this.state.american);
        }

        const rows = [];

        // all on dog
        rows.push(this.createBetObject('All on Dog', -americanFav, americanDog, americanFav));

        const leanDogRatio = this.getBettingRatio(americanDog, americanFav, .1);
        rows.push(this.createBetObject('10%', leanDogRatio, americanDog, americanFav));

        const middleRatio = this.getBettingRatio(americanDog, americanFav, .2);
        rows.push(this.createBetObject('20%', middleRatio, americanDog, americanFav));

        let leanFavRatio = this.getBettingRatio(americanDog, americanFav, .3);
        rows.push(this.createBetObject('30%', leanFavRatio, americanDog, americanFav));

        leanFavRatio = this.getBettingRatio(americanDog, americanFav, .4);
        rows.push(this.createBetObject('40%', leanFavRatio, americanDog, americanFav));

        leanFavRatio = this.getBettingRatio(americanDog, americanFav, .5);
        rows.push(this.createBetObject('50%', leanFavRatio, americanDog, americanFav));

        leanFavRatio = this.getBettingRatio(americanDog, americanFav, .6);
        rows.push(this.createBetObject('60%', leanFavRatio, americanDog, americanFav));

        leanFavRatio = this.getBettingRatio(americanDog, americanFav, .7);
        rows.push(this.createBetObject('70%', leanFavRatio, americanDog, americanFav));

        leanFavRatio = this.getBettingRatio(americanDog, americanFav, .8);
        rows.push(this.createBetObject('80%', leanFavRatio, americanDog, americanFav));

        leanFavRatio = this.getBettingRatio(americanDog, americanFav, .9);
        rows.push(this.createBetObject('90%', leanFavRatio, americanDog, americanFav));

        // all on fav
        rows.push(this.createBetObject('All on Fav', americanDog, americanDog, americanFav));

        this.setState({rows});
    }

    getBettingRatio = (americanDog, americanFav, percentage) => {
        const difference = americanDog + americanFav;
        return -americanFav + (difference * percentage);
    }

    createBetObject = (name, americanRatio, americanDog, americanFav) => {
        let wagerDog = 100;
        const wagerDogRatio = this.state.moneyDog / wagerDog;
        let ratio = americanRatio / 100;
        let wagerFav = ratio * wagerDog;
        let winDog = americanDog - wagerFav;
        let winFav = ((wagerFav / -americanFav) * 100) - wagerDog;
        let wagerTotal = wagerDog + wagerFav;
        // multiply by ration and round
        winDog = this.roundTo2DecimalPlaces(winDog * wagerDogRatio);
        winFav = this.roundTo2DecimalPlaces(winFav * wagerDogRatio);
        wagerTotal = this.roundTo2DecimalPlaces(wagerTotal * wagerDogRatio);
        wagerDog = this.roundTo2DecimalPlaces(wagerDog * wagerDogRatio);
        wagerFav = this.roundTo2DecimalPlaces(wagerFav * wagerDogRatio);
        ratio = this.roundTo2DecimalPlaces(ratio);
        //
        return {name, wagerTotal, wagerDog, wagerFav, ratio, winDog, winFav};
    }

    roundTo2DecimalPlaces = (num) => {
        return Math.round(num * 100) / 100;
    }

    render(){
        return(
            <div className='root'>
                <div className='flex'>
                    <div>
                        <InputLabel>American Odds</InputLabel>
                        <TextField
                            id="outlined-basic" variant="outlined" size="small"
                            value={this.state.american}
                            onChange={this.handleChangeAmerican}
                        />
                        <InputLabel>Implied Odds</InputLabel>
                        <TextField
                            id="outlined-basic" variant="outlined" size="small"
                            value={this.state.implied}
                        />
                        <InputLabel>Money on Dog</InputLabel>
                        <TextField
                            id="outlined-basic" variant="outlined" size="small"
                            value={this.state.moneyDog}
                            onChange={this.handleChangeDog}
                        />
                    </div>
                    <div>
                        <InputLabel>American Opposite Odds</InputLabel>
                        <TextField
                            id="outlined-basic" variant="outlined" size="small"
                            value={this.state.americanOpp}
                            onChange={this.handleChangeAmericanOpp}
                        />
                        <InputLabel>Implied Opposite Odds</InputLabel>
                        <TextField
                            id="outlined-basic" variant="outlined" size="small"
                            value={this.state.impliedOpp}
                        />
                        <div className='btn-container'>
                            <Button variant="contained" onClick={() => this.generateReport()}>Generate Report</Button>
                        </div>
                    </div>
                </div>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Betting Report</TableCell>
                            <TableCell align="right">Wager Total</TableCell>
                            <TableCell align="right">Wager Dog</TableCell>
                            <TableCell align="right">Wager Fav</TableCell>
                            <TableCell align="right">Ratio</TableCell>
                            <TableCell align="right">Dog Win</TableCell>
                            <TableCell align="right">Fav Win</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.rows.map((row) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.wagerTotal}</TableCell>
                            <TableCell align="right">{row.wagerDog}</TableCell>
                            <TableCell align="right">{row.wagerFav}</TableCell>
                            <TableCell align="right">{row.ratio}</TableCell>
                            <TableCell align="right">{row.winDog}</TableCell>
                            <TableCell align="right">{row.winFav}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default Calculator;