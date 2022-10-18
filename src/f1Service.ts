import fetch from 'node-fetch';

const baseUrl = 'https://ergast.com/api/f1/';
const headerInfo = {
    headers : { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
   }
}

export default class F1Service {

    async getStandings(year: string) {
        const response = await fetch(`${baseUrl}${year}/driverStandings.json`, headerInfo);
        const data = await response.json();
        return data.MRData.StandingsTable;
    }

    async getResults(year: string, round: string) {
        const response = await fetch(`${baseUrl}${year}/${round}/results.json`, headerInfo);
        const data = await response.json();
        return data.MRData.RaceTable;
    }
}
 
  