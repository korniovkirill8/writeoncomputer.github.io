// ������������� �������� (�) �.�.������� ��� ����������� RU 2002 (29/05/02)
// -------------------------------------------------------------
// �������� �� work == sourse (������)
// ������ -1 ��� ����� ������� � work � ������� ���������� ������
// -----------------------------

var okMessRU = '<CENTER><IMG src=./pic/prav30.gif width=56 height=60 onmouseover="this.src=\'./pic/prav31.gif\'" onmouseout="this.src=\'./pic/prav30.gif\'" border=0 alt="���������"> <TT>������ ���</TT></CENTER>'
var isErrMsedRU = true; // ��������� ������

function checkerRU(work, sourse)
{
  // ��������� �� ��������

  var lexWork = new lexerRU(work);
  var lexSourse = new lexerRU(sourse);

  lexSourse.getLex();
  lexWork.getLex();
  for (;;)
  {
    if (lexSourse.lex == "" && lexWork.lex == "") return -1; // ��!
    if (lexSourse.lex != lexWork.lex) break;                 // ������
    //alert(lexSourse.lex+"---"+lexWork.lex);
    lexSourse.getLex();
    lexWork.getLex();
  }

  // ����������� ����� ������.

  if (lexWork.lex == "")     // �������� �����
       return work.length;
  if (lexSourse.lex == "")   // ������ �����
       return lexWork.posold;
  // ������ ������ ������� (��� ����� �� ���). ������ �� �����.
  for(var pos=0; pos<lexSourse.lex.length; pos++)
  {
      if(pos >= lexWork.lex.length) break;
      if(lexSourse.lex.charAt(pos) != lexWork.lex.charAt(pos)) break;
  }
  return lexWork.posold+pos;
}


// ������ (��������� ������ �� ��������).
// �� ����� ������, ������� ��������� ���������.
// ������� ����������� ��������� � ������� �����
// ---------------------------------------------
function lexerRU(str)
{
  this.str    = str; // ������ �� ����������� ������
  this.pos    = 0;   // ������ (������) �������� �������
  this.posold = 0;   // ������ (������) ����������� �������
  this.lex    = "";  // ������� ���������� �������

  this.getLex = _getLexRU; // �������� ��������� �������
}

// �������� ��������� �������
// --------------------------
function _getLexRU()
{
  this.lex= ""
  // ���������� ������ ������� � ����� �����
  for(; this.pos < this.str.length; this.pos++)
    if (this.str.charAt(this.pos) != " "  &&
        this.str.charAt(this.pos) != "\r" &&
        this.str.charAt(this.pos) != "\n") break;

  if(this.str.charAt(this.pos) == "\r") this.pos++;
  this.posold = this.pos;

  // �������� �������
  for(; this.pos < this.str.length; this.pos++)
    if (this.str.charAt(this.pos) == " " ||
        this.str.charAt(this.pos) == "\r") break;
    else this.lex += this.str.charAt(this.pos);
}

// �����������  ������
// -------------------
// work   -- ���������� ��������� ������
// sourse -- ����������� �����
//
// ���������� HTML-��� ��� ������ � ���� �����������
// -----------------------------
function showErrRU(work,sourse)
{
  isErrMsedRU = false;
  var str = "";
  var pos = checkerRU(work, sourse);
  if (pos == -1)  str += okMessRU;
  else
  {
    isErrMsedRU = true;
    str += work.substring(0, pos);
    str += "<SPAN class=errmark>";
    if (pos < work.length) str += work.charAt(pos);
    else                   str += "__";
    str += "</SPAN>";
    pos++;
    str += work.substring(pos);
  }

  var s = "";
  var posold = 0;
  pos   = 0;
  for(;;)
  {
     pos = str.indexOf("\r",pos);
     if (pos == -1) {s += str.substring(posold); break;}
     else
     {
       s += str.substring(posold,pos);
       s += "<BR>"
       pos += 2;
       posold = pos;
     }
  }
  return s;
}

// ���������� ����� � text
// -----------------------
function linerRU(text)
{
  this.text    = text;  // ��������� �� �����, � ������� ���������� ������
  this.line    = "";    // ���������� ������
  this.pos     = 0;     // ������ (������) �������� �������
  this.posold  = 0;     // ������ (������) ����������� �������
  this.endtext = false; // ������� ����� ������

  this.getLine = _getLineRU; // �������� ��������� ������
}

// �������� ��������� ������
// --------------------------
function _getLineRU()
{
  this.line = "";
  this.posold = this.pos;
  // �������� ������
  for(; this.pos < this.text.length; this.pos++)
    if (this.text.charAt(this.pos) == "\r") break;
    else this.line += this.text.charAt(this.pos);
  this.pos += 2;
  if (this.pos >= this.text.length) this.endtext = true;
}

// �������� �� work == sourse (�� �������)
// ---------------------------------------
function checkerLineRU(work, sourse, beginblank)
{

  var lineWork   = new linerRU(work);
  var lineSourse = new linerRU(sourse);
  var pos;

  for (;;)
  {
     // ������� ��������� ������
     lineWork.getLine();
     lineSourse.getLine();
     //alert("<"+lineWork.line+">"+"<"+lineSourse.line+">")

     if (beginblank && lineWork.line.charAt(0) == " ")
     {
        // ������: ������ � ������ ������
        return lineWork.posold;
     }
     if (lineWork.endtext && lineSourse.endtext) return -1; // ��!
     // ��������� ����� �� ��������
     if ((pos=checkerRU(lineWork.line, lineSourse.line)) != -1) break;
  }

  // ����������� ����� ������.

  /*
  if (lineWork.line == "")     // �������� �����
       return work.length;
  if (lineSourse.line == "")   // ������ ������
       return lineWork.posold;
  */

  return lineWork.posold+pos;
}

// �����������  ������ (��� �������� �� �������)
// -------------------
// work   -- ���������� ��������� ������
// sourse -- ����������� �����
// beginblank == true, ���� ������ � ������ ������ -- ������
// ���������� HTML-��� ��� ������ � ���� �����������
// -----------------------------
function showErrLineRU(work,sourse, beginblank)
{
  isErrMsedRU = false;
  var str = "";
  var pos = checkerLineRU(work, sourse, beginblank);
  if (pos == -1)  str += okMessRU;
  else
  {
    isErrMsedRU = true;
    str += work.substring(0, pos);
    str += "<SPAN class=errmark>";
    if (work.charAt(pos) == "\r") str += "__\r\n";
    else if (pos < work.length) str += (work.charAt(pos) == " ") ? "__":work.charAt(pos)
    else                   str += "__";
    str += "</SPAN>";
    pos++;
    str += work.substring(pos);
  }

  var s = "";
  var posold = 0;
  pos   = 0;
  for(;;)
  {
     pos = str.indexOf("\r",pos);
     if (pos == -1) {s += str.substring(posold); break;}
     else
     {
       s += str.substring(posold,pos);
       s += "<BR>"
       pos += 2;
       posold = pos;
     }
  }
  //alert(s);
  return s;
}
