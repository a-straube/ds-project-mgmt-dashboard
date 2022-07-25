const teamMembers = [
    {
        name: "Leonardo Vinci",
        trello_id: "61f6183fe803bd5eee4e525c",
        position: "Supervisor",
        phone: "111-111-1111",
        email: "test@test.com",
        office_status: ""
    },
    {
        name: "Raphael Urbino",
        trello_id: "5ad3c6e888a4bb8ba338d865",
        position: "Development",
        phone: "111-111-1111",
        email: "test@test.com",
        office_status: ""
    },
    {
        name: "Donatello Bardi",
        trello_id: "5ad3c6e888a4bb8ba338d8XX",
        position: "Development",
        phone: "111-111-1111",
        email: "test@test.com",
        office_status: ""
    },
    {
        name: "Michelangelo Simoni",
        trello_id: "61f61858a589f81b521b717a",
        position: "HR Manager",
        phone: "111-111-1111",
        email: "test@test.com",
        office_status: "OOO.0705"
    },
    {
        name: "April O'Neil",
        trello_id: "61f61858a589f81b521b7aaa",
        position: "HR Manager",
        phone: "111-111-1111",
        email: "test@test.com",
        office_status: "OOO.0705"
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
    // elQACount.innerHTML = qaCount;
    // elCompleteCount.innerHTML = completeCount;
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
                    // borderColor: '#ffa500',
                    borderColor: '#ffca2c',
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
              }
            },
            plugins: {
                legend: {
                    position: 'right',
                    padding: {top: 0, left: 30, right: 30, bottom: 0},
                    labels: {
                        color: '#000000',
                        font: {
                            family: 'Prompt',
                            size: 16,
                            weight: 200
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#000000',
                        font: {
                            family: 'Prompt',
                            size: 18,
                            weight: 200
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
    })
    getDateToday();
    makePhaseChart();
    fillSprintChart();
    fillAccordion();
    tieCardsToEmployee();
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

/////////////
// Sidebar //
/////////////

let sideBar = document.querySelector('.side-bar');
let arrowCollapse = document.querySelector('#logo-name__icon');
let dashboardContainer = document.getElementById('dashboardContainer');
sideBar.onclick = () => {
    sideBar.classList.toggle('collapse');
    arrowCollapse.classList.toggle('collapse');
    if (arrowCollapse.classList.contains('collapse')) {
        arrowCollapse.classList = 'fa-solid fa-angles-left collapse';
        dashboardContainer.classList = '';
    } else {
        arrowCollapse.classList = 'fa-solid fa-angles-right';
        dashboardContainer.classList = 'fullsize-dash';
    }
};

////////////////////////
// Employee Breakdown //
////////////////////////

function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(attr => {
        let cleanedAttr = attr.split('_').join('-');
        element.setAttribute(cleanedAttr, attributes[attr]);
    });
}

buildCardAccordion = (e_ID, e_AccordionBody) => {
    const cardAccordion = document.createElement('div'),
    accordionAttrs = {
        id: 'ca_'+e_ID,
        class: 'accordion'
    },
    cardPhases = [
        {
            name: 'To Do',
            id: '5ad3c6eb79d93844dc6b0b40'
        },
        {
            name: 'Design',
            id: ''
        },
        {
            name: 'Phase 1',
            id: '61f613024aa7d53bc468757b'
        },
        {
            name: 'Phase 2',
            id: '61f61307219e3e3bda928af0'
        },
        {
            name: 'Phase 3',
            id: '61f6130c6e9f198e257e8cb2'
        },
        {
            name: 'QA/QC',
            id: '5ad3c6eb79d93844dc6b0b42'
        },
        {
            name: 'Complete',
            id: '5ad3c6eb79d93844dc6b0b41'
        }
    ];
    setAttributes(cardAccordion, accordionAttrs);
    
    cardPhases.forEach((phase, i) => {
        const cpAccordionItem = document.createElement('div'),
            cpAccordionHeader = document.createElement('h2'),
            cpAccordionBtn = document.createElement('button'),
            cpAccordionCollapse = document.createElement('div'),
            cpAccordionBody = document.createElement('div'),
            
            headerAttrs = {
                id: 'heading' + e_ID + i,
                class: 'accordion-header'
            },
            
            btnAttrs = {
                data_bs_toggle: 'collapse',
                data_bs_target: '#collapse' + e_ID + i,
                aria_expanded: 'true',
                aria_controls: 'collapse' + e_ID + i
            },
            
            collapseAttrs = {
                id: 'collapse' + e_ID + i,
                aria_labeledby: 'heading' + e_ID + i,
                data_bs_parent: '#ca_' + e_ID
            }, 
            
            bodyAttrs = {
                id: 'cpab_' + e_ID + i,
                class: 'accordion-body'
            };

        // Add Bootstrap accordion classes
        cpAccordionItem.setAttribute('class', 'accordion-item');
        cpAccordionBtn.classList.add('accordion-button', 'collapsed');
        cpAccordionCollapse.classList.add('accordion-collapse', 'collapse')

        setAttributes(cpAccordionHeader, headerAttrs);
        setAttributes(cpAccordionBtn, btnAttrs);
        setAttributes(cpAccordionCollapse, collapseAttrs);
        setAttributes(cpAccordionBody, bodyAttrs);

        cpAccordionItem.append(cpAccordionHeader, cpAccordionCollapse);
        cpAccordionHeader.appendChild(cpAccordionBtn);
        cpAccordionCollapse.appendChild(cpAccordionBody);

        cpAccordionBtn.innerHTML = phase.name;
        cpUL = document.createElement('ul');
        cpAccordionBody.appendChild(cpUL);

        cardAccordion.appendChild(cpAccordionItem);
    })

    e_AccordionBody.appendChild(cardAccordion);
}

fillAccordion = () => {
    const eAccordion = document.getElementById('employeeBreakdownAccordion');

    teamMembers.forEach((employee, i) => {
        let employeeName = employee.name,
            e_ID = employee.trello_id,
            e_position = employee.position,
            e_email = employee.email,
            e_phone = employee.phone,
            eAccordionItem = document.createElement('div'),
            eAccordionHeader = document.createElement('h2'),
            eAccordionBtn = document.createElement('button'),
            eAccordionCollapse = document.createElement('div'),
            eAccordionBody = document.createElement('div');

        const headerAttrs = {
            id: 'heading'+i,
            class: 'accordion-header'
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

        const bodyAttrs = {
            id: 'ab_'+e_ID,
            class: 'accordion-body'
        }

        // Add Bootstrap accordion classes
        eAccordionItem.setAttribute('class', 'accordion-item');
        eAccordionBtn.classList.add('accordion-button', 'collapsed');
        eAccordionCollapse.classList.add('accordion-collapse', 'collapse')

        setAttributes(eAccordionHeader, headerAttrs);
        setAttributes(eAccordionBtn, btnAttrs);
        setAttributes(eAccordionCollapse, collapseAttrs);
        setAttributes(eAccordionBody, bodyAttrs);

        eAccordionItem.append(eAccordionHeader, eAccordionCollapse);
        eAccordionHeader.appendChild(eAccordionBtn);
        eAccordionCollapse.appendChild(eAccordionBody);

        eAccordionBtn.innerHTML = '<div class="e-name">'+
                                employeeName+
                                '</div><div class="e-info"><span>'+
                                e_position+
                                '</span><a href="insert-company-internal-message-link-here"><i class="fa-solid fa-comments"></i></a><a href="mailto:'+
                                e_email+
                                '"><i class="fa-regular fa-envelope"></i></a><a href="tel:'+
                                e_phone+
                                '"><i class="fa-solid fa-phone"></i></a></div>';

        eAccordion.appendChild(eAccordionItem);
    })
}

tieCardsToEmployee = () => {
    teamMembers.forEach(employee => {
        const e_ID = employee.trello_id,
            e_AccordionBodyID = 'ab_'+e_ID,
            e_AccordionBody = document.getElementById(e_AccordionBodyID),
            cardUL = document.createElement('ul'),
            e_ToDoListID = 'cpab_'+e_ID+'0',
            // e_ToDoList = document.getElementById(${e_ToDoListID}),
            asdf = e_ToDoList.querySelector('ul');
            // e_DesignListID = 'cpab_'+e_ID+'0',
            // e_DesignList = document.getElementById(e_DesignListID).querySelector('ul'),
            // e_Phase1ListID = 'cpab_'+e_ID+'0',
            // e_Phase1List = document.getElementById(e_Phase1ListID).querySelector('ul'),
            // e_Phase2ListID = 'cpab_'+e_ID+'0',
            // e_Phase2List = document.getElementById(e_Phase2ListID).querySelector('ul'),
            // e_Phase3ListID = 'cpab_'+e_ID+'0',
            // e_Phase3List = document.getElementById(e_Phase3ListID).querySelector('ul'),
            // e_QAQCListID = 'cpab_'+e_ID+'0',
            // e_QAQCList = document.getElementById(e_QAQCListID).querySelector('ul'),
            // e_CompleteListID = 'cpab_'+e_ID+'0',
            // e_CompleteList = document.getElementById(e_CompleteListID).querySelector('ul');
        let e_Cards = [];

        allCards.forEach(card => {
            
            let cardData = {
                id: card.id,
                client: card.name,
                members: card.idMembers,
                phase: card.idList,
                trello_link: card.shortUrl
            }

            cardData.members.forEach(member => {
                if(e_ID===member) {
                    e_Cards.push(cardData);
                }
            })
        })

        e_Cards.forEach(card => {
            const cardLI = document.createElement('li');
            cardLI.innerHTML = card.client;
            // cardUL.appendChild(cardLI);
            console.log(card.phase);
            if(card.phase==='5ad3c6eb79d93844dc6b0b40') {
                asdf.appendChild(cardLI);
            } else if(card.phase==='61f613024aa7d53bc468757b') {
                // e_Phase1List.appendChild(cardLI);
            } else if(card.phase==='61f61307219e3e3bda928af0') {
                // e_Phase2List.appendChild(cardLI);
            } else if(card.phase==='61f6130c6e9f198e257e8cb2') {
                // e_Phase3List.appendChild(cardLI);
            } else if(card.phase==='5ad3c6eb79d93844dc6b0b42') {
                // e_QAQCList.appendChild(cardLI);
            } else if(card.phase==='5ad3c6eb79d93844dc6b0b41') {
                // e_CompleteList.appendChild(cardLI);
            }
        })

        e_AccordionBody.appendChild(cardUL);
        buildCardAccordion(e_ID, e_AccordionBody);
    })
}