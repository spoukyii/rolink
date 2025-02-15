import axios from 'axios'
import { ServerResponse } from 'http';

async function invoke(server , userid , roleid) {
    axios.request({
        method: "PUT",
        url: `https://www.guilded.gg/api/v1/servers/${server}/members/${userid}/roles/${roleid}`,
        headers: {Authorization: "Bearer", "Content-Type": "application/json"}
        }).then(response => {
        console.log(response.data)
    }).catch(error => {
        console.log(error)
    })

}

export default invoke;
