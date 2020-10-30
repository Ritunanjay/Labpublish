<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="MachineResultDetail.aspx.cs" Inherits="ITHospital.Navigation.Machine.MachineResultDetail" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
 <script src="<%= ResolveClientUrl("~/project_js/machineresultdetail.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
      <div class="container-fluid">
        <!--Head section --->

        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Machine Result Detail</h5>
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
                        <legend class="fieldSetLabel">Filter Detail</legend>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    From Date</label>
                                <input id="txtfromdate" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label ">
                                    To Date</label>
                                <input id="txttodate" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="form-group">
                                <label class="control-label ">
                                    Advance Search Detail</label>
                                <input id="txtpatientfilter" placeholder="Advance Search Here" class="form-control" />
                            </div>
                        </div>
                    </fieldset> <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Machine Result</legend>

                      <table class="table table-reponsive table-bordered table-stripped" id="gv">
                    </table>
                       </fieldset>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
