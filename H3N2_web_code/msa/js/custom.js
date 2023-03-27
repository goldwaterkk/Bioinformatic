//自己的默认序列，add by qy
let seqs_ids = []
let seqs = msa.io.fasta.parse(MAFFT_data);
let opts = {};
opts.seqs = seqs
opts.el = document.getElementById("mymsa");
opts.vis = {
    sequences: true,
    markers: true,
    metacell: true,
    conserv: false,
    overviewbox: false,
    seqlogo: true,
    gapHeader: true,
    leftHeader: true,

    // about the labels
    labels: true,
    labelName: true,
    labelId: true,
    labelPartition: true,
    labelCheckbox: true,

    // meta stuff
    metaGaps: true,
    metaIdentity: true,
    metaLinks: true
}
opts.zoomer = {alignmentHeight: 405, labelWidth: 110, labelFontsize: "13px", labelIdLength: 50}
opts.conf = {
    registerMouseClicks: true,
}
let m = new msa.msa(opts);
let menuOpts = {};
menuOpts.el = document.getElementById('div');
menuOpts.msa = m;
let defMenu = new msa.menu.defaultmenu(menuOpts);
m.addView("menu", defMenu);
m.render();
let defalt_2d = deal2D()  //2d文件
let list_ = $(".biojs_msa_labelblock")
m.g.on("row:click", function (data) {
    //鼠标点击一行后的操作
    newSeqsIds = []
    $(".biojs_msa_labelblock").children().each(function (i, n) {
        $(n).find("input").each(function (j, c) {
            if (j === 0 && $(c).get(0).checked) {
                newSeqsIds.push(i)
            }
        });
    })
    seqs_ids = newSeqsIds
    //生成第一个chart的数据
    let d = {name: [], seq: [], chart2: []}
    for (let i = 0; i < seqs_ids.length; i++) {
        let model = m.seqs.models[seqs_ids[i]].attributes
        name_ = model.name
        seq_ = convertNumberSeq(model.seq)
        d.name.push(model.name)
        d.seq.push({value: seq_, name: name_})
        d.chart2 = d.chart2.concat(convertToChart2(i, model.seq))
    }
    if (d.name.length >= 5) {
        alert("Maximum number of choices: 4")
        return
    }
    refreshData(d)
    refreshW(d.name, d.chart2)
})


function deal2D() {
    let hours = [
        'A', 'R', 'N', 'D', 'C', 'Q', 'E', 'H', 'I', 'L', 'K', 'M', 'F', 'P', 'S', 'T', 'W', 'Y', 'V', 'G'
    ];
    let models = m.seqs.models
    let ss = []
    models.forEach(function (item) {
        let s = []
        for (let j = 0; j < item.attributes.seq.length; j++) {
            s.push(hours.indexOf(item.attributes.seq[j]))
        }
        ss.push(s)
    });
    let d = {}
  
    $.ajax({
        // url: "http://localhost:8686/get2D",
        url: "http://121.5.64.168/ksh/get2D",
        method: 'post',
        async: false,
        data: JSON.stringify({"seq": ss}),
        
        headers: {
            "Content-Type": "application/json;charset=utf8"
        },
        success: function (data) {
            d = JSON.parse(data)["rs"]
        },
        error: function (err) {
            alert("处理数据失败")
            d = []
        }
    });
    return d
}


$(".smenubar").hide()

function convertToChart2(idx, seq) {
    let hours = {
        'A': 0,
        'R': 0,
        'N': 0,
        'D': 0,
        'C': 0,
        'Q': 0,
        'E': 0,
        'H': 0,
        'I': 0,
        'L': 0,
        'K': 0,
        'M': 0,
        'F': 0,
        'P': 0,
        'S': 0,
        'T': 0,
        'W': 0,
        'Y': 0,
        'V': 0,
        'G': 0
    }
    let a = []
    for (let j = 0; j < seq.length; j++) {
        hours[seq[j]]++
    }
    let i = 0;
    for (let key in hours) {
        a.push([idx, i, hours[key]])
        i += 1
    }
    return a
}

function convertNumberSeq(seq) {
    mapping = {
        'A': 1,
        'R': 2,
        'N': 3,
        'D': 4,
        'C': 5,
        'Q': 6,
        'E': 7,
        'H': 8,
        'I': 9,
        'L': 10,
        'K': 11,
        'M': 12,
        'F': 13,
        'P': 14,
        'S': 15,
        'T': 16,
        'W': 17,
        'Y': 18,
        'V': 19,
        'G': 20
    }
    let S = []
    for (let i = 0; i < seq.length; i++) {
        S.push(mapping[seq[i]])
    }
    return S
}

function findFunctionAndClick(ith, jth) {
    $(".smenubar").children().each(function (i, n) {
        if (ith === i) {
            $(n).find("li").each(function (j, c) {
                if (jth === j) {
                    $(c).click()
                }
            });
        }
    })
}

function test() {
    exportToSeq()
}

//获取选中ids
function returnSelectedIdsList() {
    return seqs_ids
}

//导入文件
{
    function importFormFile() {
        findFunctionAndClick(0, 1)
    }
}

//selection
{
    function findMotif() {
        let search = $("#searchContent").val()
        // console.log(search)
        let flg = /^[a-zA-Z]+$/.test(search);
        if (flg) {
            m.g.user.set("searchText", search)
        } else {
            alert("Please re-enter the sequence (such as QKLPGN), all letters.")
        }

    }
}
//过滤
{
    function hcbyThreshold() {
        findFunctionAndClick(1, 0)
    }

    function hcbySelection() {
        findFunctionAndClick(1, 1)
    }

    function hcbyGaps() {
        findFunctionAndClick(1, 2)
    }

    function hsbyIdentity() {
        findFunctionAndClick(1, 3)
    }

    function hsbySelection() {
        findFunctionAndClick(1, 4)
    }

    function hsbyGaps() {
        findFunctionAndClick(1, 5)
    }

    function filterRest() {
        findFunctionAndClick(1, 6)
    }
}
//颜色主题
{
    function setZappo() {
        findFunctionAndClick(4, 0)
    }

    function setTaylor() {
        findFunctionAndClick(4, 1)
    }

    function setHydrophobicity() {
        findFunctionAndClick(4, 2)
    }

    function setLesk() {
        findFunctionAndClick(4, 3)
    }

    function setCinema() {
        findFunctionAndClick(4, 4)
    }

    function setMAE() {
        findFunctionAndClick(4, 5)
    }

    function setClustal() {
        findFunctionAndClick(4, 6)
    }

    function setClustal2() {
        findFunctionAndClick(4, 7)
    }

    function setTrun() {
        findFunctionAndClick(4, 8)
    }

    function setStrand() {
        findFunctionAndClick(4, 9)
    }

    function setBuried() {
        findFunctionAndClick(4, 10)
    }

    function setHelix() {
        findFunctionAndClick(4, 11)
    }

    function setNucleotid() {
        findFunctionAndClick(4, 12)
    }

    function setPurine() {
        findFunctionAndClick(4, 13)
    }

    function setPID() {
        findFunctionAndClick(4, 14)
    }

    function setNoColor() {
        findFunctionAndClick(4, 15)
    }

    function setHideBckgd() {
        findFunctionAndClick(4, 16)
    }

    function setShade() {
        findFunctionAndClick(4, 17)
    }

    function setShadeByThreshold() {
        findFunctionAndClick(4, 18)
    }

    function setShadeSelection() {
        findFunctionAndClick(4, 19)
    }

    function setShadeReset() {
        findFunctionAndClick(4, 20)
    }

}
//排序
{
    function orderById() {
        findFunctionAndClick(5, 0)
    }

    function orderByIdDesc() {
        findFunctionAndClick(5, 1)
    }

    function orderByLabel() {
        findFunctionAndClick(5, 2)
    }

    function orderByLabelDesc() {
        findFunctionAndClick(5, 3)
    }

    function orderBySeq() {
        findFunctionAndClick(5, 4)
    }

    function orderBySeqDesc() {
        findFunctionAndClick(5, 5)
    }

    function orderByIdentity() {
        findFunctionAndClick(5, 6)
    }

    function orderByIdentityDesc() {
        findFunctionAndClick(5, 7)
    }

    function orderByReference() {
        findFunctionAndClick(5, 8)
    }

    function orderByPartitionCodes() {
        findFunctionAndClick(5, 9)
    }

}
//extras
{
    function extrasIFS() {
        findFunctionAndClick(6, 2)
    }

    function extrasDFS() {
        findFunctionAndClick(6, 3)
    }

    function extrasMW() {
        findFunctionAndClick(6, 4)
    }

    function extrasMH() {
        findFunctionAndClick(6, 5)
    }
}
//导出
{
    function exportToSeq() {
        findFunctionAndClick(7, 3)
    }

    function exportToSelection() {
        findFunctionAndClick(7, 4)
    }

    function exportToImage() {
        findFunctionAndClick(7, 6)
    }
}
