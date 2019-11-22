
// 将所有的事件放入事件池
let axios = require('axios');
const queue = []
let max = 200

function addTask(url) {
    queue.push(url)
}

function runTask() {
    while (max > 0) {
        max--
        if (queue.length > 0) {
            let url = queue.shift()
            axios.get(url, {maxRedirects: 0}
            )
                .catch(function (error) {
                    if (error.response.status !== 302) {
                        console.log(false);
                    } else {
                        console.log(true);
                    }
                })
                .finally(function () {
                    max++
                    runTask()
                })
        }
    }
}


for (let i = 0; i < 20000; i++) {
    addTask("https://linkcenterus3.derbysoftca.com/linkcenter-v3/booking?site_id=barcelo-tripadvisor&s_hotel_id=BARCELO-123&s_u_language=en-GB&s_u_device=desktop&s_u_country=UK&q_out_year=2019&q_out_month=08&q_out_day=12&q_in_year=2019&q_in_month=08&q_in_day=11&q_adults=1&p_user_currency=GBP&is_valid=false&account_id=&a_hotel_id=&party={adults=1}{children=}&s_placement_type=tripadvisor&s_click_id=XUKtFQoQJEQAAM-UjZsAAAAD")
}

runTask()