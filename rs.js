// ����������� �������� ������
// ---------------------------
var picBonusRU = new Array(
'<IMG src=./pic/prav00.gif width=56 height=60 onmouseover="this.src=\'./pic/prav01.gif\'" onmouseout="this.src=\'./pic/prav00.gif\'" border=0 alt="��������">',
'<IMG src=./pic/prav10.gif width=56 height=60 onmouseover="this.src=\'./pic/prav11.gif\'" onmouseout="this.src=\'./pic/prav10.gif\'" border=0 alt="���������">',
'<IMG src=./pic/prav20.gif width=56 height=60 onmouseover="this.src=\'./pic/prav21.gif\'" onmouseout="this.src=\'./pic/prav20.gif\'" border=0 alt="�������">',
'<IMG src=./pic/prav30.gif width=56 height=60 onmouseover="this.src=\'./pic/prav31.gif\'" onmouseout="this.src=\'./pic/prav30.gif\'" border=0 alt="���������">'
                          );

// ����������� ��������� ������
// ----------------------------
function edStrRU(name,tasks)
{
  this.tasks     = new Array(); // ������ ������� (������ �����, �������, �����)
  this.name      = name;        // ��� ����������
  this.nameform  = name+"f";    // ��� �����
  this.edname    = "rs";        // ��� ���� �����
  this.lenname   = name+"l";    // ��� ���� "����� �������"
  this.taskname  = name+"t";    // ��� ���� "����� �������"
  this.bonusname = name+"b";    // ��� ���� "������� � �������"
  this.zname     = name+"z";    // ��� �������� "������"
  this.ready     = false;       // ���������� � �������
  this.num       = 0;           // ������� ����� �������
  this.bonusmark = "";          // ������� � ������������ ������� �����
  this.bonusplus = 0;           // ����� ��������� �������� �����

  this.heighted  = "28pt";      // ������ ��� ������ �������

  // �������
  this.showEdStrRU  = _showEdStrRU;  // �������� �����������
  this.clearEdStrRU = _clearEdStrRU; // ����� �����������
  this.undoEdStrRU = _undoEdStrRU;   // ������� ���������� �������
  this.enterEdStrRU = _enterEdStrRU; // ���� ������������
  this.bonusRU = _bonusRU;           // ����� ��������-������

  // �������� �������
  for (var i=0; i<tasks.length; i++)
  {
    this.tasks[i]    = new Array();
    this.tasks[i][0] = tasks[i][0];
    this.tasks[i][1] = tasks[i][1];
    this.tasks[i][2] = tasks[i][2];
  }

}

// ����� �����������
// -----------------
function _clearEdStrRU()
{
  eval("document.all['"+this.zname+"'].innerHTML=picBonusRU[3]");
  eval("document.all['"+this.taskname+"'].innerHTML='1. '+this.tasks[0][1]");
  eval("document."+this.nameform+"."+this.edname+".value=this.tasks[0][0]");
  eval("document.all['"+this.lenname+"'].innerText=this.tasks.length");
  eval("document.all['"+this.bonusname+"'].innerHTML='&nbsp;'");
  this.ready = true;
  this.num   = 0;
  this.bonusmark = "";
  this.bonusplus = 0;
}

// ������� ���������� �������
// --------------------------
function _undoEdStrRU()
{
  if (this.ready && this.num)
  {
    this.num--;
    if (this.bonusmark.charAt(this.bonusmark.length-2) == "+")
    {
      this.bonusplus--;
      this.bonusmark = this.bonusmark.substring(0,this.bonusmark.length-2);
    }
    else
      this.bonusmark = this.bonusmark.substring(0,this.bonusmark.length-7);


    // ����� ������ � ��������� � ������������ �������
     eval("document.all['"+this.bonusname+"'].innerHTML=this.bonusmark");

        // ����� ����� ���������� �����
        eval("document.all['"+this.lenname+"'].innerText=this.tasks.length-this.num");

        // ����� ������ �������
          eval("document.all['"+this.taskname+"'].innerHTML=parseInt(this.num+1)+'. '+this.tasks[this.num][1]");
        // ������� ������ �����
        if(this.num < this.tasks.length)
          eval("document."+this.nameform+"."+this.edname+".value=this.tasks[this.num][0]");
        else
          eval("document."+this.nameform+"."+this.edname+".value=''");

        // ����� �������� ������-��������
        this.bonusRU();

  }
}



// ���� ������������
// -----------------
function _enterEdStrRU()
{
  if (this.ready)
  {
    if(this.num < this.tasks.length)
    {
      var str = eval("document."+this.nameform+"."+this.edname+".value");
      if (str == "") alert("������ �� ��������!");
      else
      {
        var znak = "&#150;";

        // �������� ������������ �����
        if (str == this.tasks[this.num][2]) {znak = "+"; this.bonusplus++;}
        this.bonusmark += znak+ " ";

        // ����� ������ � ��������� � ������������ �������
        eval("document.all['"+this.bonusname+"'].innerHTML=this.bonusmark");

        this.num++

        // ����� ����� ���������� �����
        eval("document.all['"+this.lenname+"'].innerText=this.tasks.length-this.num");

        // ����� ������ �������
        if(this.num < this.tasks.length)
          eval("document.all['"+this.taskname+"'].innerHTML=parseInt(this.num+1)+'. '+this.tasks[this.num][1]");
        else
          eval("document.all['"+this.taskname+"'].innerHTML='<B style=\" color:red\">��� ������� ���������!</B>'");
        // ������� ������ �����
        if(this.num < this.tasks.length)
          eval("document."+this.nameform+"."+this.edname+".value=this.tasks[this.num][0]");
        else
          eval("document."+this.nameform+"."+this.edname+".value=''");

        // ����� �������� ������-��������
        this.bonusRU();

      }
    }
    else alert("��� ������� ���������!");
  }

}

//--------------------------------------------------------
// ������� ������
// --------------
// �������� ����������� ������:
//
// 5 - ������ ���                         0
// 4 - ������ ������ 2/5 �� ����� �����   1
// 3 - ������ ������ 1/2 �� ����� �����   2
// 2 - � ��������� �������                3

function  _bonusRU()
{
  var bonus; // ������ ��������
  var error = this.num-this.bonusplus;

  if (!error)                    bonus = 3;
  else if (error < 2*this.num/5) bonus = 2;
  else if (error < this.num/2)   bonus = 1;
  else                           bonus = 0;

  eval("document.all['"+this.zname+"'].innerHTML=picBonusRU[bonus]");
}

// �������� �����������
// --------------------
function _showEdStrRU()
{

  var str = "<FORM name="+this.nameform+">";
  str +=    "<STYLE>";
  str +=    " .inputEd";
  str +=    " {";  // ���� 10pt; 37
  str +=    "   font-size:110%;";
  str +=    '   font-family: "Arial Cyr", Arial;';
  str +=    "   letter-spacing:1px;";
  str +=    "   color:rgb(0,0,40);";
  str +=    " }";
  str +=    "</STYLE>";
  str += '<DIV style="background-color:#EEE5DB;width:480;border-style:solid;border-width:2px;border-left-color:silver;border-top-color:silver;border-right-color:gray;border-bottom-color:gray;padding:10px;">';
  str += '<TABLE border=0 cellspacing=0 cellpadding=5 width=100%>';

  str += '<TR valign=top>';
  str +=  '<TD><IMG src=./pic/ed.gif width=310 height=41 border=0 alt=""></TD>';
  str +=  '<TD><IMG src=./pic/clear.gif width=113 height=41 border=0 alt="�����" onmouseup="'+this.name+'.clearEdStrRU()" onmousedown="this.src=\'./pic/clear2.gif\'" onmouseover="this.src=\'./pic/clear1.gif\'" '+
          'onmouseout ="this.src=\'./pic/clear.gif\'"></TD>';
  str += '</TR>';

  str += '<TR valign=top>';
  str +=   '<TD><INPUT class=inputEd type=text size=30 name='+this.edname+' value="" onkeypress="if(event.keyCode==13) '+this.name+'.enterEdStrRU()"></TD>';
  str +=   '<TD><NOBR><IMG src=./pic/key5.gif width=30 height=30 border=0 alt=���� onmouseover="this.src=\'./pic/key5_.gif\'" onmouseout="this.src=\'./pic/key5.gif\'" onclick="'+this.name+'.enterEdStrRU()">'+
           ' <IMG src=./pic/key6.gif width=30 height=30 border=0 alt=������� onmouseover="this.src=\'./pic/key6_.gif\'" onmouseout="this.src=\'./pic/key6.gif\'" onclick="'+this.name+'.undoEdStrRU()">'+
           '<INPUT type=text size=1 style="visibility:hidden">'+
           '<SPAN id='+this.lenname+' style="font-size:14pt;color:#BE9802;font-weight:bold;">&nbsp;</SPAN></NOBR></TD>';
  str += '</TR>';

  str += '<TR valign=top>';
  str +=   '<TD colspan=2><SPAN id='+this.taskname+' style="height:'+this.heighted+';font-size:12pt;color:black;">������� ������ <B style="color:#009900">�����</B></SPAN></TD>';
  str += '</TR>';
  str += '<TR valign=top>';
  str +=   '<TD><BR><IMG src=./pic/line.gif width=310 height=2 border=0 alt=""><BR><SPAN id='+this.bonusname+' style=" font-size:14pt;color:#BE9802;font-weight:800;">&nbsp;</SPAN></TD>';
  str +=   '<TD id='+this.zname+' align=right><IMG src=./pic/prav30.gif width=56 height=60  border=0 alt=""></TD>';
  str += '</TR>';

  str += '</TABLE></DIV></FORM>';

  //alert(str);
  document.write(str);
}
