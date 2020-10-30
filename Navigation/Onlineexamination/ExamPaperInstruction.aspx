<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/ExamOnline.Master" AutoEventWireup="true" CodeBehind="ExamPaperInstruction.aspx.cs" Inherits="LabMS.Navigation.Onlineexamination.ExamPaperInstruction" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <script src="<%= ResolveClientUrl("~/school_js/exampaperinstruction.js") %>" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="hdfpapersetid" runat="server" ClientIDMode="Static" />
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="panel panel-info card-view">
            <div class="panel-heading">
                <div class="pull-left">
                    <h6 class="panel-title txt-light">Paper Instruction Detail</h6>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="panel-wrapper collapse in">
                <div class="panel-body">

                    <h2><strong>Here are the features of the Testbook’s Practice Set for Average:</strong></h2>

                    <ul>
                        <li>The Practice Set includes 30 questions.</li>
                        <li>Questions of varying complexities and types have been included in the practice set.</li>
                        <li>All the questions included in the Practice Set strictly adhere to the latest pattern of the exam.</li>
                        <li>The candidates don’t have to look for solutions anywhere else as they have been included in the practice set itself.</li>
                     <%--   <li>Important tricks and techniques have also been discussed in the solutions and detailed explanations of the problems.</li>
                        <li>The candidates will be provided with a Chapter Progress Report on completion of the practice set.</li>
                      --%>  <li>The aspirants can navigate between the questions according to your preference.</li>
                        <li>They also save any question they feel like revising or reviewing later in the future.</li>
                        <li>The Practice Set can be easily accessed anytime.</li>
                    </ul>

                    <p>If you want to access the Bank PO Average Practice Set, open the Homepage of the Testbook and click on Practice. Then choose Bank PO Practice. Now, click on the topic Average on the list. Go ahead and start practising.</p>

                    <ul>
                        <li>You will get to learn all the important tips and tricks for solving the problems quickly.</li>
                        <li>It will help you revise the topic quickly and efficiently.</li>
                        <li>It will enhance your efficiency, accuracy and speed for solving the problems.</li>
                        <li>You will be able to assess your preparation, strengths and weaknesses better after attempting the practice set.</li>
                       <%-- <li>You will get a clear idea about the nature of the questions framed from this particular topic.</li>
                        <li>It will provide you with ample practice which is one of the most important aspects of cracking any exam.</li>
                       --%> <li>Attempting the Bank PO Average Practice Set will also help you in devising a strategy for your best performance in the exam.</li>
                        <li>It will ensure that you score maximum marks in the real exam.</li>
                    </ul>

                    <p>Candidates are advised to take advantage of the best Average practice set available out there. The Bank PO Average Practice Set will surely boost your confidence and preparation to another so, give it a try for sure.</p>

                    <p>All the best!</p>
                    <input type="checkbox" class="checkbox" id="chckallinst" /> All Instruction Read Carefully Submitted
                     <input type="button" class="btn btn-success btnstartexam" value="Start Exam Now" style="width:100%" />
                </div>
            </div>
        </div>
    </div>

</asp:Content>
