/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: JspC/ApacheTomcat9
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.WEB_002dINF.partials.canvas;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class new_002dparameter_002dprovider_002ddialog_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent,
                 org.apache.jasper.runtime.JspSourceImports {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  private static final java.util.Set<java.lang.String> _jspx_imports_packages;

  private static final java.util.Set<java.lang.String> _jspx_imports_classes;

  static {
    _jspx_imports_packages = new java.util.HashSet<>();
    _jspx_imports_packages.add("javax.servlet");
    _jspx_imports_packages.add("javax.servlet.http");
    _jspx_imports_packages.add("javax.servlet.jsp");
    _jspx_imports_classes = null;
  }

  private volatile javax.el.ExpressionFactory _el_expressionfactory;
  private volatile org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public java.util.Map<java.lang.String,java.lang.Long> getDependants() {
    return _jspx_dependants;
  }

  public java.util.Set<java.lang.String> getPackageImports() {
    return _jspx_imports_packages;
  }

  public java.util.Set<java.lang.String> getClassImports() {
    return _jspx_imports_classes;
  }

  public javax.el.ExpressionFactory _jsp_getExpressionFactory() {
    if (_el_expressionfactory == null) {
      synchronized (this) {
        if (_el_expressionfactory == null) {
          _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
        }
      }
    }
    return _el_expressionfactory;
  }

  public org.apache.tomcat.InstanceManager _jsp_getInstanceManager() {
    if (_jsp_instancemanager == null) {
      synchronized (this) {
        if (_jsp_instancemanager == null) {
          _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
        }
      }
    }
    return _jsp_instancemanager;
  }

  public void _jspInit() {
  }

  public void _jspDestroy() {
  }

  public void _jspService(final javax.servlet.http.HttpServletRequest request, final javax.servlet.http.HttpServletResponse response)
      throws java.io.IOException, javax.servlet.ServletException {

    if (!javax.servlet.DispatcherType.ERROR.equals(request.getDispatcherType())) {
      final java.lang.String _jspx_method = request.getMethod();
      if ("OPTIONS".equals(_jspx_method)) {
        response.setHeader("Allow","GET, HEAD, POST, OPTIONS");
        return;
      }
      if (!"GET".equals(_jspx_method) && !"POST".equals(_jspx_method) && !"HEAD".equals(_jspx_method)) {
        response.setHeader("Allow","GET, HEAD, POST, OPTIONS");
        response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "JSPs only permit GET, POST or HEAD. Jasper also permits OPTIONS");
        return;
      }
    }

    final javax.servlet.jsp.PageContext pageContext;
    final javax.servlet.ServletContext application;
    final javax.servlet.ServletConfig config;
    javax.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    javax.servlet.jsp.JspWriter _jspx_out = null;
    javax.servlet.jsp.PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html;charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, false, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("\n\n<div id=\"new-parameter-provider-dialog\" layout=\"column\" class=\"hidden\">\n    <div class=\"dialog-content\">\n        <div layout=\"row\" style=\"padding-bottom:0\">\n            <div flex=\"25\" layout=\"row\" layout-align=\"start center\">\n                <div class=\"setting-name\" style=\"margin-top: 10px;\">Source</div>\n            </div>\n            <div flex layout=\"row\" layout-align=\"space-between center\" id=\"parameter-provider-type-filter-controls\" class=\"filter-status\">\n                <div id=\"parameter-provider-type-filter-status\">\n                    Displaying&nbsp;<span id=\"displayed-parameter-provider-types\"></span>&nbsp;of&nbsp;<span id=\"total-parameter-provider-types\"></span>\n                </div>\n                <div id=\"controller-service-type-filter-container\">\n                    <input type=\"text\" id=\"parameter-provider-type-filter\" placeholder=\"Filter\"/>\n                </div>\n            </div>\n        </div>\n        <div flex layout=\"row\" style=\"padding-top:0;height: 90%;\">\n            <div flex=\"25\" id=\"parameter-provider-tag-cloud-container\">\n");
      out.write("                <div class=\"setting\">\n                    <div class=\"setting-field\">\n                        <div id=\"parameter-provider-bundle-group-combo\"></div>\n                    </div>\n                </div>\n                <div class=\"setting\">\n                    <div class=\"setting-field\">\n                        <div id=\"parameter-provider-tag-cloud\"></div>\n                    </div>\n                </div>\n            </div>\n            <div layout=\"column\" flex id=\"parameter-provider-types-container\">\n                <div id=\"parameter-provider-types-table\" class=\"unselectable\"></div>\n                <div id=\"parameter-provider-type-container\">\n                    <div id=\"parameter-provider-type-name\"></div>\n                    <div id=\"parameter-provider-type-bundle\"></div>\n                </div>\n                <div id=\"parameter-provider-description-container\" class=\"hidden\">\n                    <div id=\"parameter-provider-type-description\" class=\"ellipsis multiline\"></div>\n                    <span class=\"hidden\" id=\"selected-parameter-provider-name\"></span>\n");
      out.write("                    <span class=\"hidden\" id=\"selected-parameter-provider-type\"></span>\n                </div>\n            </div>\n        </div>\n        <div class=\"clear\"></div>\n    </div>\n</div>\n");
    } catch (java.lang.Throwable t) {
      if (!(t instanceof javax.servlet.jsp.SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try {
            if (response.isCommitted()) {
              out.flush();
            } else {
              out.clearBuffer();
            }
          } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}