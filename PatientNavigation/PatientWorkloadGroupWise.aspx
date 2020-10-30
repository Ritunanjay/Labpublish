<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/PatientMainMaster.Master" AutoEventWireup="true" CodeBehind="PatientWorkloadGroupWise.aspx.cs" Inherits="LabMS.PatientNavigation.PatientWorkloadGroupWise" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    
    <script src="<%= ResolveClientUrl("~/project_js/patientworkloadgroupwise.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container-fluid">
        <!--Head section --->

        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Investigation List For Patient</h5>
                </div>
                <!-- Breadcrumb -->
            </div>
        </div>

        <div class="panel panel-default card-view panel-refresh" style="margin-top: 3%;">
            <div class="refresh-container" style="display: none;">
                <div class="la-anim-1">
                </div>
            </div>

            <div id="collapse_2" class="panel-wrapper collapse in" aria-expanded="true" style="">
                <div class="panel-body">
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Your Investigation List</legend>
                        <div id="collapse_1" class="panel-wrapper collapse in" aria-expanded="true" style="">
                            <div class="panel-body">
                                <table id="gvpathology" class="table table-striped table-hover table-bordered dt-responsive" style="width: 100%;">
                                </table>
                            </div>
                        </div>
                    </fieldset>

                </div>
            </div>
        </div>

    </div>

</asp:Content>
