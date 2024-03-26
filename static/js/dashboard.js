const line=document.getElementById("line"),
pie=document.getElementById("pie");
let myChart1,myChart2,data_expense,labels_expense,label_title_expense,data_income,labels_income,label_title_income;
line.addEventListener("click",()=>{
    myChart1.destroy(),
    myChart2.destroy(),
    renderExpenseChart(data_expense,labels_expense,"line",label_title_expense),
    renderIncomeChart(data_income,labels_income,"line",label_title_income)
}),
pie.addEventListener("click",()=>{
    myChart1.destroy(),
    myChart2.destroy(),
    renderExpenseChart(data_expense,labels_expense,"pie",label_title_expense),
    renderIncomeChart(data_income,labels_income,"pie",label_title_income)
});
const renderExpenseChart=(e,t,a,n)=>{
    var r=document.getElementById("myChart1").getContext("2d");
    myChart1=new Chart(r,{
        type:a,
        data:{
            labels:t,
            datasets:[
                {label:"This month's expenses",
                data:e,
                backgroundColor:[
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)"
                ],
                borderColor:[
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)"
                ],
                borderWidth:1
            }
        ]
    },
    options:{
        title:{
            display:!0,
            text:n
        }
    }
})
},
renderIncomeChart=(e,t,a,n)=>{
    var r=document.getElementById("myChart2").getContext("2d");
    myChart2=new Chart(
        r,
        {
            type:a,
            data:{
                labels:t,
                datasets:[
                    {
                        label:"This month's incomes",
                        data:e,
                        backgroundColor:[
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(255, 159, 64, 0.2)"
                        ],
                        borderColor:[
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)"
                        ],
                        borderWidth:1
                    }
                ]
            },
            options:{
                title:{
                    display:!0,
                    text:n
                }
            }
        }
        )
    },
    getChartData=e=>{
        fetch("/expense/expense-summary-data?filter=month").then(e=>e.json()).then(
            t=>{
                const a=t.expense_category_data;
                label_title_expense=t.label_title;
                const[n,
                    r]=[
                        Object.keys(a),
                        Object.values(a)
                    ];
                renderExpenseChart(data_expense=r,labels_expense=n,e,label_title_expense)
            }
            ),
            fetch("/income/income-summary-data?filter=month").then(e=>e.json()).then(
                t=>{
                    const a=t.income_source_data;
                    label_title_income=t.label_title;
                    const[n,
                        r]=[
                            Object.keys(a),
                            Object.values(a)
                        ];
                        renderIncomeChart(data_income=r,labels_income=n,e,label_title_income)
                    }
                    )
                };
                document.onload=getChartData("pie");