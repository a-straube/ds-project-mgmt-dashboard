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
        scaleNumberLI.setAttribute('class','scaleLI');
        scaleNumberLI.innerHTML = i;
        sprintChartScaleContainer.appendChild(scaleNumberLI);
    }
    
    sprintChartScaleLI.appendChild(sprintChartScaleContainer);
    sprintChartList.insertBefore(sprintChartScaleLI, sprintChartList.firstChild);
    setScaleAndRunnerWidth(scaleHigh);
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

clearRunnerAnimations = () => {
    let runners = document.querySelectorAll('.sprintChartList__runner--invisible');
    let runnerContainers = document.querySelectorAll('.sprintChartList__runner-container');
    const clearDustAndShowIcons = runners.forEach(runner => {
        runner.innerHTML = '';
        runner.classList.remove('sprintChartList__runner--invisible');
    });
    runnerContainers.forEach(containerUL => {
        let lis = containerUL.children,
            lisLength = lis.length,
            lastRunner = lis[lisLength-1];
        console.log(lis);
        lastRunner.classList.add('sprintChartList__runner--last');
    })
}

getDateToday = () => {
    let today = new Date();
    today = today.toLocaleDateString();

    [...document.querySelectorAll('.date-today')].forEach(dateTodaySpan => {
        dateTodaySpan.innerHTML = today
    });
}

fillDepartmentWorkloadChart = (adminCount, devCount, hrCount, itCount, productionCount, salesCount) => {
    const ctx = document.getElementById('departmentWorkloadChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
              ' Admin',
              ' Dev',
              ' HR',
              ' IT',
              ' Production',
              ' Sales'
            ],
            datasets: [{
              data: [adminCount, devCount, hrCount, itCount, productionCount, salesCount],
              backgroundColor: [
                'RGBA(64, 181, 116, 0.95)',
                'RGBA(64, 185, 148, 0.95)',
                'RGBA(64, 189, 182, 0.95)',
                'RGBA(66, 167, 192, 0.95)',
                'RGBA(68, 138, 194, 0.95)',
                'RGBA(70, 109, 196, 0.95)'
              ],
              borderColor: 'rgba(240,240,240,0.65)',
              borderWidth: 1.5,
              borderJoinStyle: 'bevel',
              hoverBorderColor: '#ffffff',
              hoverBorderWidth: 3
            }]
        },
        options: {
            animation: {
                // delay: 1000,
                duration: 4000
            },
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
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
        let runner = document.createElement('li'),
            runnerDust = document.createElement('div');
        runner.setAttribute('class','sprintChartList__runner sprintChartList__runner--invisible');
        runnerDust.setAttribute('class','sprintChartList__runner-dust');
        runnerDust.innerHTML = 'o0o0o0o';
        runner.appendChild(runnerDust);
        runnerContainer.appendChild(runner);
    }
} 

let sprintTaskCompletionTotals = [];
fillSprintChart = () => {
    const sprintChartList = document.getElementById('sprintChartList');

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
            let cardMembers = card.idMembers,
                cardList = card.idList;
            
            if(cardList==='5ad3c6eb79d93844dc6b0b41') {
                cardMembers.forEach(memberID => {
                    if(memberID===memberTrelloID) {
                        sprintTasksComplete++;
                    }
                })
            }
        });

        fillRunnerContainer(sprintTasksComplete, runnerContainer);
        sprintChartLI.appendChild(runnerContainer);
        sprintChartList.appendChild(sprintChartLI);
        sprintTaskCompletionTotals.push(sprintTasksComplete);
    });
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
                    label: ' Filter A',
                    animations: {
                        y: { delay: 1000, duration: 3000 }
                    },
                    data: [toDoCount-6, 4, phaseOneCount+2, phaseTwoCount+8, phaseThreeCount, qaCount+3, completeCount-9],
                    borderColor: '#ff0000',
                    borderDash: [5, 5],
                    borderWidth: 1
                }, {
                    label: ' Filter B',
                    animations: {
                        y: { delay: 500, duration: 3000 }
                    },
                    data: [toDoCount-3, 1, phaseOneCount+2, phaseTwoCount, phaseThreeCount-3, qaCount+1, completeCount-6],
                    borderColor: '#ffa500',
                    borderWidth: 2
                }, {
                    label: ' Main',
                    animations: {
                        y: { duration: 3000 }
                    },
                    data: [toDoCount, 0, phaseOneCount, phaseTwoCount, phaseThreeCount, qaCount, completeCount],
                    backgroundColor: 'rgba(0,50,100,0.35)',
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
                from: 1,
                to: 0,
                loop: false
              }
            },
            plugins: {
                legend: {
                    position: 'right',
                    padding: {top: 0, left: 30, right: 30, bottom: 0},
                    labels: {
                        color: '#000000',
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
                            size: 18
                        }
                    }
                },
                y: { display: false }
            }
        }
    });
}

setScaleAndRunnerWidth = (scaleHigh) => {
    const x = parseInt(scaleHigh);
    const runnerWidth = 100/x;
    [...document.querySelectorAll('.sprintChartList__runner')].forEach(runnerLIItem => {
        runnerLIItem.style.width = runnerWidth+'%';
    });
    [...document.querySelectorAll('.scaleLI')].forEach(scaleLI => {
        scaleLI.style.width = runnerWidth+'%';
    });
    setTimeout(clearRunnerAnimations,3000);
}

Trello.get('boards/QCJDklm5/cards', function(cards) {
    $.each(cards, function(ix, card) {
        calcPhaseTotals(card);
        calcDepartmentTotals(card);
        allCards.push(card);
        console.log(card);
    })
    getDateToday();
    makePhaseChart();
    fillSprintChart();
    fillAccordion();
}, function (error){
    console.log(error);
});
    
document.addEventListener("DOMContentLoaded", function() {
    var lazyloadGraph = document.getElementById('chartTrigger');    
    var lazyloadThrottleTimeout;
    
    function lazyload () {
        if(lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
        }    
            
        lazyloadThrottleTimeout = setTimeout(function() {
            var scrollTop = window.pageYOffset;
            if(lazyloadGraph.offsetTop < (window.innerHeight + scrollTop)) {
                addSprintChartXAxisScale(sprintTaskCompletionTotals, sprintChartList);
                fillDepartmentWorkloadChart(adminCount, devCount, hrCount, itCount, productionCount, salesCount);
                document.removeEventListener("scroll", lazyload);
                window.removeEventListener("resize", lazyload);
                window.removeEventListener("orientationChange", lazyload);
            }
        }, 20);
    }
    
    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
});

////////////////////////
// Employee Breakdown //
////////////////////////

function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(attr => {
        let cleanedAttr = attr.split('_').join('-');
        element.setAttribute(cleanedAttr, attributes[attr]);
    });
}

fillAccordion = () => {
    const eAccordion = document.getElementById('employeeBreakdownAccordion');

    teamMembers.forEach((employee, i) => {
        let employeeName = employee.name,
            eAccordionItem = document.createElement('div'),
            eAccordionHeader = document.createElement('h2'),
            eAccordionBtn = document.createElement('button'),
            eAccordionCollapse = document.createElement('div'),
            eAccordionBody = document.createElement('div') ;

        const headerAttrs = {
            id: 'heading'+i
        }

        const btnAttrs = {
            data_bs_toggle: 'collapse',
            data_bs_target: '#collapse'+i,
            aria_expanded: 'true',
            aria_controls: 'collapse'+i
        }

        const collapseAttrs = {
            id: 'collapse'+i,
            aria_labeledby: 'heading'+i,
            data_bs_parent: '#employeeBreakdownAccordion'
        }

        // Add Bootstrap accordion classes
        eAccordionItem.setAttribute('class', 'accordion-item');
        eAccordionHeader.setAttribute('class', 'accordion-header');
        eAccordionBtn.classList.add('accordion-button', 'collapsed');
        eAccordionCollapse.setAttribute('class', 'accordion-collapse');
        eAccordionCollapse.classList.add('accordion-collapse', 'collapse')
        eAccordionBody.setAttribute('class', 'accordion-body');

        setAttributes(eAccordionHeader, headerAttrs);
        setAttributes(eAccordionBtn, btnAttrs);
        setAttributes(eAccordionCollapse, collapseAttrs);

        eAccordionItem.append(eAccordionHeader, eAccordionCollapse);
        eAccordionHeader.appendChild(eAccordionBtn);
        eAccordionCollapse.appendChild(eAccordionBody);

        eAccordionBtn.innerHTML = employeeName;
        eAccordionBody.innerHTML = 'Hello!';

        eAccordion.appendChild(eAccordionItem);
    })
}