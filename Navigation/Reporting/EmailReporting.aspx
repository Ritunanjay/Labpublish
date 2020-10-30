<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="EmailReporting.aspx.cs" Inherits="LabMS.Navigation.Reporting.EmailReporting" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/emailreporting.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <!--Head section --->

        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Report Emailing</h5>
                </div>
                <!-- Breadcrumb -->
            </div>
        </div>


        <div class="panel panel-default card-view panel-refresh" style="margin-top: 3%;">
            <div class="refresh-container" style="display: none;">
                <div class="la-anim-1">
                </div>
            </div>

            <div id="collapse_1" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                   <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Email Sending</legend>
                      <table class="table table-reponsive table-bordered table-stripped" id="gv">
                    </table>
                       </fieldset>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
