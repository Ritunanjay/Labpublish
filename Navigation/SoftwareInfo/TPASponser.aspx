<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="TPASponser.aspx.cs" Inherits="ITHospital.Navigation.SoftwareInfo.TPASponser" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/tpasponserdetail.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">TPA Sponsor Detail</h5>
                    <asp:HiddenField ID="hdftpasponserid" runat="server" ClientIDMode="static" Value="0" />
                    <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                    <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
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
                        <legend class="fieldSetLabel">Add New TPA Sponsor</legend>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Sponser Name<samp style="color: Red">*</samp></label>
                                <input id="txtsponsername" class="form-control" placeholder="Sponser Name" onfocus="uppercase(this)" clientidmode="Static" />
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    EmailID<samp style="color: Red">*</samp></label>
                                <input id="txtemailid" class="form-control" placeholder="EmailID" onfocus="select(this)" clientidmode="Static" />
                            </div>
                        </div>
                        
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Fax<samp style="color: Red"></samp></label>
                                <input id="txtfax" class="form-control" placeholder="Fax" onfocus="allownumericwithoutdecimal(this)" clientidmode="Static" />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    MobileNo<samp style="color: Red">*</samp></label>
                                <input id="txtmobileno" class="form-control" placeholder="Mobile No" maxlength="10" onfocus="allownumericwithoutdecimal(this)" clientidmode="Static" />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    PhoneNo<samp style="color: Red"></samp></label>
                                <input id="txtphoneno" class="form-control" placeholder="Phone No" maxlength="15" onfocus="allownumericwithoutdecimal(this)" clientidmode="Static" />
                            </div>
                        </div>
                        
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    Address<samp style="color: Red">*</samp></label>
                                <input id="txtaddress" class="form-control" placeholder="Address" onfocus="titlecase(this)" clientidmode="Static" />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    PostalCode<samp style="color: Red"></samp></label>
                                <input id="txtpostalcode" class="form-control" placeholder="Postal Code" maxlength="5" onfocus="allownumericwithoutdecimal(this)" clientidmode="Static" />
                            </div>
                        </div>
                         <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label ">
                                    State/City/Area</label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlstate" class="form-control" style="width: 33%"></select>
                                        <select id="ddlcity" class="form-control" style="width: 33%"></select>
                                        <select id="ddlarea" class="form-control" style="width: 34%"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Claim Format<samp style="color: Red"></samp></label>
                                <select id="ddlclaimformat" class="form-control">
                                    <option value="Excel">Excel</option>
                                    <option value="PDF">PDF</option>
                                    <option value="Mail">Mail</option>
                                    <option value="Word">Word</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Sacnned Document Required<samp style="color: Red"></samp></label>
                                <select id="ddlscanneddocument" class="form-control" clientidmode="Static">
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Prior Authorization<samp style="color: Red">*</samp></label>
                                <select id="ddlpriorauthorization" class="form-control" clientidmode="Static">
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                        </div>
                         <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Sponsor Type<samp style="color: Red"></samp></label>
                                <select id="ddlsponsortype" class="form-control">
                                </select>
                            </div>
                        </div>
                       
                        

                          <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    IsRateList<samp style="color: Red"></samp></label>
                                <select id="ddlratelist" class="form-control" clientidmode="Static">
                                      <option value="false">No</option>
                                  <option value="true">Yes</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Status<samp style="color: Red"></samp></label>
                                <select id="ddlstatus" class="form-control" clientidmode="Static">
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Contact Person Name<samp style="color: Red"></samp></label>
                                <input id="txtpname" class="form-control" placeholder="Person Name" onfocus="uppercase(this)" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Contact Person Designation<samp style="color: Red"></samp></label>
                                <input id="txtpdesignation" class="form-control" placeholder="Person Designation" onfocus="titlecase(this)" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Contact Person Mobile<samp style="color: Red"></samp></label>
                                <input id="txtpmobile" class="form-control" placeholder="Mobile" onfocus="allownumericwithoutdecimal(this)" maxlength="10" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                   Contact Person EmailID<samp style="color: Red"></samp></label>
                                <input id="txtpemail" class="form-control" placeholder="EmailID" onfocus="titlecase(this)" clientidmode="Static" />

                            </div>
                        </div>
                      
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">TPA Sponsor List</legend>
                        <div class="panel-body" style="overflow:scroll">
                            <table id="gv" class="table table-striped table-hover table-bordered dt-responsive" style="width: 100%;">
                            </table>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
        <!--button section --->
        <div class="col-md-12 fixbuttonsectionbuttom">
            <div class="col-md-12 text-center">

                <input type="button" id="btnadd" class="btn btn-success btn-xs" value="Add TPASponser" accesskey="A" />
                <input type="button" id="btnclear" class="btn btn-warning btn-xs" value="Clear" accesskey="C" />
            </div>
        </div>
    </div>

</asp:Content>
