<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/ExamOnline.Master" AutoEventWireup="true" CodeBehind="ExamPaperSelection.aspx.cs" Inherits="LabMS.Navigation.Onlineexamination.ExamPaperSelection" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <script src="<%= ResolveClientUrl("~/school_js/exampaperselection.js") %>" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="panel panel-primary card-view">
                <div class="panel-heading" style="background-color: #3f729b; box-shadow: 0 0 6px 6px #090b0c; text-shadow: 0 0 7px #fbf5f5;">
                    <div class="pull-left" style="font-weight: 900;">
                        <h6 class="panel-title txt-dark">Candidate Name	:
                            <label id="lnkname">Sushil Kumar Yadav </label>
                        </h6>
                        <h6 class="panel-title txt-dark">StudentCode	:
                            <label id="lblclass">Sushil Kumar Yadav </label>
                        </h6>
                        <h6 class="panel-title txt-dark">SecretID	  :
                            <label id="lblpapercode">Sushil Kumar Yadav </label>
                        </h6>
                    </div>
                    <div class="pull-right">
                        <img src="101374133_1629294920555461_6294898596676370432_o.jpg" alt="" class="img img-thumbnail lnkstudentimage" style="height: 75px; width: 90px" />
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="panel-wrapper collapse in">
                    <div class="panel-body">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <p>According To Your Class Subject Detail Your Active Paper Is Given Below</p>
                            <hr class="light-grey-hr mt-10 mb-15" />
                            <div class="allsubject"></div>
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <p>According To Your Class Subject Detail Your Active Paper Is Given Below</p>
                            <hr class="light-grey-hr mt-10 mb-15" />
                            <div class="assignsubject"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
