<%@ Page Title="" Language="C#" MasterPageFile="~/Masterpage/MainMaster.Master" AutoEventWireup="true" CodeBehind="Centreregistration.aspx.cs" Inherits="ITHospital.Navigation.RegistrationDetail.Centreregistration" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="<%= ResolveClientUrl("~/project_js/centreregistration.js") %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container-fluid">
        <!--Head section --->
        <div class="col-md-12 fixtopsectionbuttom">
            <div class="row heading-bg col-md-12">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h5 class="txt-dark">Centre & Franchise Detail</h5>
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
                        <legend class="fieldSetLabel">Add New Centre/Franchise Detail</legend>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    IsMainCentre<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlismain" class="form-control" clientidmode="Static" style="width: 100%">
                                            <option value="false">No</option>
                                            <option value="true">Yes</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    Centre/Franchise Code/Name<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <asp:HiddenField ID="hdfcentreid" runat="server" ClientIDMode="static" Value="0" />
                                        <asp:HiddenField ID="hdfadd" runat="server" ClientIDMode="Static" Value="0" />
                                        <asp:HiddenField ID="hdfupdate" runat="server" ClientIDMode="Static" Value="0" />
                                        <asp:HiddenField ID="hdfprint" runat="server" ClientIDMode="Static" Value="0" />
                                        <asp:HiddenField ID="hdfdelete" runat="server" ClientIDMode="Static" Value="0" />
                                        <input id="txtcode" class="form-control" maxlength="10" onfocus="uppercase(this);" placeholder="Code" clientidmode="Static" style="width: 30%" />
                                        <input id="txtcentrename" class="form-control" maxlength="200" onfocus="titlecase(this);" placeholder="Centre Name" clientidmode="Static" style="width: 70%" />
                                    </div>
                                </div>
                            </div>
                        </div>
                         <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Franchise Type<samp style="color: Red"></samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">

                                        <select id="ddlcentretype" class="form-control" clientidmode="Static" style="width: 100%">
                                            <option value="0">Choose</option>
                                            <option value="Prepaid">Prepaid</option>
                                            <option value="Postpaid">Postpaid</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    RateList<samp style="color: Red"></samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlratelist" class="form-control" style="width: 100%">
                                            <option value="false">No</option>
                                            <option value="true">Yes</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                         <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Status<samp style="color: Red">*</samp></label>
                                <select id="ddlstatus" class="form-control" clientidmode="Static">
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                        </div>
                         <div class="col-md-4" style="">
                            <div class="form-group">
                                <label class="control-label">
                                    Account Post/Type/Value<samp style="color: Red"></samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlaccountpost" class="form-control" clientidmode="Static" style="width: 33%">
                                            <option value="false">No</option>
                                            <option value="true">Yes</option>
                                        </select>
                                        <select id="ddlaccounttype" class="form-control" clientidmode="Static" style="width: 33%">
                                            <option value="0">Percentage</option>
                                            <option value="1">Centre RateList</option>
                                        </select>
                                        <input id="txtaccountvalue" class="form-control" value="0" onfocus="allownumericwithoutdecimal(this);" placeholder="Account Value" clientidmode="Static" style="width: 33%" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="control-label">
                                    IsCredit/Limit/Balance<samp style="color: Red"></samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlcreditlimit" class="form-control" clientidmode="Static" style="width: 33%">
                                            <option value="false">No</option>
                                            <option value="true">Yes</option>
                                        </select>
                                        <input id="txtcreditlimit" class="form-control" onfocus="allownumericwithoutdecimal(this);" value="0" placeholder="Cerdit Limit" clientidmode="Static" style="width: 33%" />
                                        <input id="txtbalancelimit" class="form-control" onfocus="allownumericwithoutdecimal(this);" value="0" placeholder="Balance Amount" clientidmode="Static" style="width: 33%" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                   Mobile<samp style="color: Red">*</samp></label>
                                       <input id="txtmobile" class="form-control" onfocus="allownumericwithoutdecimal(this);" maxlength="10" required placeholder="Mobile" clientidmode="Static"  />
                                  
                            </div>
                        </div>
                         <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Phone<samp style="color: Red">*</samp></label>
                                   <input id="txtphone" class="form-control" onfocus="allownumericwithoutdecimal(this);" maxlength="10" placeholder="Phone" clientidmode="Static" />
                                  
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    EmailID<samp style="color: Red">*</samp></label>
                                      <input id="txtemail" class="form-control" placeholder="Email ID" clientidmode="Static" maxlength="150" style="width: 100%" />
                                    
                            </div>
                        </div>
                       
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Address<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txtaddress" class="form-control" maxlength="500" placeholder="Address" clientidmode="Static" style="width: 100%" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-5">
                            <div class="form-group">
                                <label class="control-label">
                                    State/City/Area<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlstate" class="form-control" clientidmode="Static" style="width: 33%">
                                        </select>
                                        <select id="ddlcity" class="form-control" clientidmode="Static" style="width: 33%">
                                        </select>
                                        <select id="ddlarea" class="form-control" clientidmode="Static" style="width: 33%">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Timings/Report Limit<samp style="color: Red"></samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <input id="txttiming" class="form-control" value="00:00" style="width: 50%"  placeholder="Timings" clientidmode="Static" />
                                        <input id="txtreportlimit" class="form-control" value="0" style="width: 50%" onfocus="allownumericwithoutdecimal(this);" placeholder="Report Limit" clientidmode="Static" />
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                       
                    </fieldset>
                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Centre & Franchise Misc. Detail</legend>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    CounterType/CounterStart<samp style="color: Red">*</samp></label>
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <select id="ddlcountertype" class="form-control" clientidmode="Static" style="width: 50%">
                                            <option value="D">Daily</option>
                                            <option value="M">Monthly</option>
                                            <option value="Y">Yearly</option>
                                        </select>
                                        <input id="txtstartcounter" class="form-control" placeholder="StartCounter" value="0" onfocus="allownumericwithoutdecimal(this);" style="width: 50%" clientidmode="Static" />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Establishment Date<samp style="color: Red"></samp></label>
                                <input id="txtestablishmentdate" class="form-control" onfocus="titlecase(this)" placeholder="Establishment Date" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Firm RegNo<samp style="color: Red"></samp></label>
                                <input id="txtfirmregno" class="form-control" onfocus="titlecase(this)" placeholder="Firm Reg No" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    PAN<samp style="color: Red"></samp></label>
                                <input id="txtpan" class="form-control" onfocus="titlecase(this)" placeholder="PAN" clientidmode="Static" />

                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Tax Deduction A/c No<samp style="color: Red"></samp></label>
                                <input id="txttaxdeductionno" class="form-control" onfocus="titlecase(this)" placeholder="Tax Deduction A/c No" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Contact Person Name<samp style="color: Red"></samp></label>
                                <input id="txtcontactpersonname" class="form-control" onfocus="titlecase(this)" placeholder="Contact Person Name" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    No Of Days To Be Divided<samp style="color: Red">*</samp></label>
                                <input id="txtdaysdivided" class="form-control" onfocus="allownumericwithoutdecimal(this)" placeholder=" No Of Days To Be Divided" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Minimum Age of Joining<samp style="color: Red">*</samp></label>
                                <input id="txtminageofjoining" class="form-control" onfocus="allownumericwithoutdecimal(this)" placeholder=" No Of Days To Be Divided" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label class="control-label">
                                    Max Age of Retirement<samp style="color: Red">*</samp></label>
                                <input id="txtmaxageretirement" class="form-control" onfocus="allownumericwithoutdecimal(this)" placeholder=" Max Age of Retirement" clientidmode="Static" />

                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Principal Officer Name<samp style="color: Red"></samp></label>
                                <input id="txtprincipal" class="form-control" onfocus="titlecase(this)" placeholder="   Principal Officer Name" clientidmode="Static" />

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="control-label">
                                    Designation<samp style="color: Red"></samp></label>
                                <input id="txtdesignation" class="form-control" onfocus="titlecase(this)" placeholder="Designation" clientidmode="Static" />

                            </div>
                        </div>
                    </fieldset>

                    <fieldset class="fieldSetBorder">
                        <legend class="fieldSetLabel">Centre Information List</legend>
                        <div id="collapse_1" class="panel-wrapper collapse in" aria-expanded="true" style="overflow: scroll">
                            <div class="col-md-12">
                                <table id="gv" class="table table-bordered dt-responsive" style="width: 100%;">
                                </table>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
        <!--button section --->
        <div class="col-md-12 fixbuttonsectionbuttom">
            <div class="col-md-12 text-center">

                <input type="button" id="btnadd" accesskey="A" class="btn btn-success btn-xs" value="Add New Centre/Franchise" />
                <input type="button" id="btnclear" accesskey="C" class="btn  btn-warning btn-xs" value="Clear" />
            </div>
        </div>
    </div>
    <!--Modal Popup for Chief Complaint-->

</asp:Content>

