import axios from 'axios'

async function invoke(channel , contenttype) {
    axios.request({
        method: "POST",
        url: `https://www.guilded.gg/api/v1/channels/${channel}/messages`,
        headers: {Authorization: "Bearer", "Content-Type": "application/json"},
        data: {content:contenttype}
    }).then(response => {
        console.log(response.data)
    }).catch(error => {
        console.log(error)
    })

}

export default invoke;
