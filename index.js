// List IDs
// To Do:    5ad3c6eb79d93844dc6b0b40
// Phase 1:  61f613024aa7d53bc468757b
// Phase 2:  61f61307219e3e3bda928af0
// Phase 3:  61f6130c6e9f198e257e8cb2
// QA:       5ad3c6eb79d93844dc6b0b42
// Complete: 5ad3c6eb79d93844dc6b0b41

const teamMembers = [
    {
        name: 'Marcus Aurelius',
        trello_id: '61f6183fe803bd5eee4e525c'
    },
    {
        name: 'Rosa Parks',
        trello_id: '5ad3c6e888a4bb8ba338d865'
    },
    {
        name: 'Yogi Berra',
        trello_id: '61f61858a589f81b521b717a'
    }
];

let allCards = [];

// Phase count HTML elements
let elToDoCount = document.getElementById('toDoCount'),
    elPhaseOneCount = document.getElementById('phaseOneCount'),
    elPhaseTwoCount = document.getElementById('phaseTwoCount'),
    elPhaseThreeCount = document.getElementById('phaseThreeCount'),
    elQACount = document.getElementById('qaCount'),
    elCompleteCount = document.getElementById('completeCount');

// Phase Totals
let toDoCount = 0,
    phaseOneCount = 0,
    phaseTwoCount = 0,
    phaseThreeCount = 0,
    qaCount = 0,
    completeCount = 0;

// Department Totals
let adminCount = 0,
    devCount = 0,
    hrCount = 0,
    itCount = 0,
    productionCount = 0,
    salesCount = 0;

addSprintChartXAxisScale = (sprintTaskCompletionTotals, sprintChartList) => {
    const highestTaskCompletionTotal = Math.max(...sprintTaskCompletionTotals),
        scaleHigh = highestTaskCompletionTotal+3;
    
    let sprintChartScaleLI = document.createElement('li'),
        sprintChartScaleContainer = document.createElement('ul');

    sprintChartScaleLI.setAttribute('class','sprintChartList__scale');

    for (let i = 1; i < scaleHigh; i++) {
        let scaleNumberLI = document.createElement('li');
        scaleNumberLI.innerHTML = i;
        sprintChartScaleContainer.appendChild(scaleNumberLI);
    }
    
    sprintChartScaleLI.appendChild(sprintChartScaleContainer);
    sprintChartList.insertBefore(sprintChartScaleLI, sprintChartList.firstChild);
    setRunnerWidth(scaleHigh);
}

calcDepartmentTotals = (card) => {
    let cardLabels = card.labels;
    cardLabels.forEach(label => {
        let department = label.name;
        if(department==='Admin') {
            adminCount++;
        } else if(department==='Dev') {
            devCount++;
        } else if(department==='HR') {
            hrCount++;
        } else if(department==='IT') {
            itCount++;
        } else if(department==='Production') {
            productionCount++;
        } else if(department==='Sales') {
            salesCount++;
        }
    });
}

calcPhaseTotals = (card) => {
    let cardListID = card.idList;
    if(cardListID==='5ad3c6eb79d93844dc6b0b40') {
        toDoCount++;
    } else if(cardListID==='61f613024aa7d53bc468757b') {
        phaseOneCount++;
    } else if(cardListID==='61f61307219e3e3bda928af0') {
        phaseTwoCount++;
    } else if(cardListID==='61f6130c6e9f198e257e8cb2') {
        phaseThreeCount++;
    } else if(cardListID==='5ad3c6eb79d93844dc6b0b42') {
        qaCount++;
    } else if(cardListID==='5ad3c6eb79d93844dc6b0b41') {
        completeCount++;
    }
}

getDateToday = () => {
    let today = new Date();
    today = today.toLocaleDateString();

    // let dateSpans = document.getElementsByClassName('date-today');
    [...document.querySelectorAll('.date-today')].forEach(dateTodaySpan => {
        dateTodaySpan.innerHTML = today
    });
    // console.log(dateSpans);
    // console.log(dateSpans[0].innerHTML);
    // dateSpans[0].innerHTML = today;
    // dateSpans[1].innerHTML = today;
}

fillProductionPhaseDataList = () => {
    elToDoCount.innerHTML = toDoCount;
    elPhaseOneCount.innerHTML = phaseOneCount;
    elPhaseTwoCount.innerHTML = phaseTwoCount;
    elPhaseThreeCount.innerHTML = phaseThreeCount;
    elQACount.innerHTML = qaCount;
    elCompleteCount.innerHTML = completeCount;
}

fillRunnerContainer = (numberOfRunners, runnerContainer) => {
    for (let i = 0; i < numberOfRunners; i++) {
        let runner = document.createElement('li');
        runner.setAttribute('class','sprintChartList__runner');
        runnerContainer.appendChild(runner);
    }
} 

fillSprintChart = () => {
    const sprintChartList = document.getElementById('sprintChartList');
    let sprintTaskCompletionTotals = [];

    teamMembers.forEach(member => {
        let memberNameSpan = '<span class="sprintChartList__member-name">'+member.name+'</span>',
            memberTrelloID = member.trello_id,
            sprintTasksComplete = 0,
            sprintChartLI = document.createElement('li'),
            runnerContainer = document.createElement('ul'),
            runner = document.createElement('li');
            
        sprintChartLI.setAttribute('class','sprintChartList__li');
        sprintChartLI.innerHTML = memberNameSpan;
        runnerContainer.setAttribute('class','sprintChartList__runner-container');
        runner.setAttribute('class','sprintChartList__runner');

        allCards.forEach(card => {
            let cardMembers = card.idMembers;
            cardMembers.forEach(memberID => {
                if(memberID===memberTrelloID) {
                    sprintTasksComplete++;
                }
            })
        });

        fillRunnerContainer(sprintTasksComplete, runnerContainer);
        sprintChartLI.appendChild(runnerContainer);
        sprintChartList.appendChild(sprintChartLI);
        sprintTaskCompletionTotals.push(sprintTasksComplete);
    });
    
    addSprintChartXAxisScale(sprintTaskCompletionTotals, sprintChartList);
}

makePhaseChart = () => {
    fillProductionPhaseDataList();
    const ctx = document.getElementById('productionPhaseChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['To Do', 'Design', 'Phase 1', 'Phase 2', 'Phase 3', 'QA/QC', 'Complete'],
            datasets: [
                {
                    label: ' Filter.1',
                    animations: {
                        y: { delay: 1000, duration: 3000 }
                    },
                    data: [toDoCount-6, 4, phaseOneCount+2, phaseTwoCount+8, phaseThreeCount, qaCount+3, completeCount-9],
                    borderColor: '#ffa500',
                    borderWidth: 2
                }, {
                    label: ' Filter.2',
                    animations: {
                        y: { delay: 500, duration: 3000 }
                    },
                    data: [toDoCount-3, 1, phaseOneCount+2, phaseTwoCount, phaseThreeCount-3, qaCount+1, completeCount-6],
                    borderColor: '#ff0000',
                    borderDash: [5, 5],
                    borderWidth: 1
                }, {
                    label: ' Main',
                    animations: {
                        y: { duration: 3000 }
                    },
                    data: [toDoCount, 0, phaseOneCount, phaseTwoCount, phaseThreeCount, qaCount, completeCount],
                    backgroundColor: 'rgba(216,216,216,0.45)',
                    borderColor: '#d8d8d8',
                    borderWidth: 1,
                    fill: true
                }
            ]
        },
        options: {
            animations: {
              y: {
                easing: 'easeInOutElastic',
                from: (ctx) => {
                  if (ctx.type === 'data') {
                    if (ctx.mode === 'default' && !ctx.dropped) {
                      ctx.dropped = true;
                      return 0;
                    }
                  }
                }
              },
              tension: {
                duration: 3000,
                easing: 'linear',
                from: 1.5,
                to: 0,
                loop: false
              }
            },
            plugins: {
                legend: {
                    position: 'right',
                    padding: {top: 0, left: 30, right: 30, bottom: 0},
                    labels: {
                        color: '#ffffff',
                        font: {
                            family: 'Red Hat Display',
                            size: 16
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#000000',
                        font: {
                            family: 'Red Hat Display',
                            size: 16
                        }
                    }
                },
                y: { display: false }
            }
        }
    });
}

setRunnerWidth = (scaleHigh) => {
    const x = parseInt(scaleHigh);
    const runnerWidth = 100/x;
    [...document.querySelectorAll('.sprintChartList__runner')].forEach(runnerLIItem => {
        runnerLIItem.style.width = runnerWidth+'%';
    });
}

Trello.get('boards/QCJDklm5/cards', function(cards) {
    $.each(cards, function(ix, card) {
        calcPhaseTotals(card);
        allCards.push(card);
    })
    getDateToday();
    makePhaseChart();
    fillSprintChart();
}, function (error){
    console.log(error);
});

