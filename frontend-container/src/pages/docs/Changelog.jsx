import React from 'react';
import useHelmet from '../../utils/HelmetLoader';
import { Badge, Col, Container, Row } from 'react-bootstrap';

const Changelog = () => {
  const Helmet = useHelmet();

  if (!Helmet) return null;

  return (
    <React.Fragment>
      <Helmet title="Changelog" />
      <Container fluid className="p-0">
        <Row>
          <Col lg={10} xl={8} className="col-xxl-7 mx-auto">
            <h1>Changelog</h1>
            <hr className="my-4" />

            <h4 className="d-inline-block me-1">
              <Badge bg="primary">v3.1.0</Badge>
            </h4>
            <h5 className="d-inline-block">– 8 June, 2023</h5>
            <ul>
              <li>Added: Social buttons to auth pages</li>
              <li>Improved: Various visual changes</li>
              <li>Updated: Vite 4.3.9</li>
              <li>Updated: Bootstrap 5.3.0</li>
              <li>Updated: Dependencies to latest versions</li>
            </ul>

            <h4 className="d-inline-block me-1">
              <Badge bg="primary">v3.0.0</Badge>
            </h4>
            <h5 className="d-inline-block">– 10 March, 2023</h5>
            <ul>
              <li>Improved: Faster code compilation</li>
              <li>Improved: Faster development server</li>
              <li>Improved: Output bundle size</li>
              <li>Added: Page loaders</li>
              <li>Migrated: Create React App to Vite</li>
              <li>Migrated: Jvectormap to Jsvectormap</li>
              <li>Fixed: Firebase auth issues</li>
              <li>Fixed: Chat layout issues</li>
              <li>Updated: Bootstrap 5.2.3</li>
              <li>Updated: React 18.2.0</li>
              <li>Updated: Chart.js 4.2.1</li>
              <li>Updated: FullCalendar 6.1.4</li>
              <li>Updated: Dependencies to latest versions</li>
            </ul>

            <h4 className="d-inline-block me-1">
              <Badge bg="primary">v2.2.0</Badge>
            </h4>
            <h5 className="d-inline-block">– 30 April, 2022</h5>
            <ul>
              <li>Added: TypeScript version</li>
              <li>Fixed: Firebase auth issues</li>
              <li>Updated: Bootstrap 5.1.3</li>
              <li>Updated: Dependencies to latest versions</li>
            </ul>

            <h4 className="d-inline-block me-1">
              <Badge bg="primary">v2.1.0</Badge>
            </h4>
            <h5 className="d-inline-block">– 7 October, 2021</h5>
            <ul>
              <li>Added: Table pagination (advanced-tables/pagination)</li>
              <li>
                Added: Table column sorting (advanced-tables/column-sorting)
              </li>
              <li>
                Added: Table column filters (advanced-tables/column-filtering)
              </li>
              <li>
                Added: Table row expanding (advanced-tables/row-expanding)
              </li>
              <li>
                Added: Table row selection (advanced-tables/row-selection)
              </li>
              <li>Removed: react-bootstrap-table-2</li>
              <li>Migrated: Node Sass to Dart Sass</li>
              <li>Updated: Quill 2.0.0-beta.4</li>
              <li>Updated: Bootstrap 5.1.2</li>
              <li>Updated: Dependencies to latest versions</li>
            </ul>

            <h4 className="d-inline-block me-1">
              <Badge bg="primary">v2.0.1</Badge>
            </h4>
            <h5 className="d-inline-block">– 3 October, 2021</h5>
            <ul>
              <li>Fix: CSS output files</li>
              <li>Updated: Dependencies to latest versions</li>
            </ul>

            <h4 className="d-inline-block me-1">
              <Badge bg="primary">v2.0.0</Badge>
            </h4>
            <h5 className="d-inline-block">– 27 September, 2021</h5>
            <ul>
              <li>Added: Dark mode support</li>
              <li>Added: Theme builder</li>
              <li>Added: Compact sidebar variant</li>
              <li>Added: Right sidebar variant</li>
              <li>Added: Formik examples (form-plugins/formik)</li>
              <li>Added: Offcanvas examples (ui/offcanvas)</li>
              <li>Added: Firebase authentication</li>
              <li>Added: Cognito authentication</li>
              <li>Added: Auth0 authentication</li>
              <li>Added: JWT authentication</li>
              <li>Added: Prettier</li>
              <li>Added: ESLint</li>
              <li>Added: Web Vitals</li>
              <li>Added: Internationalization (i18next)</li>
              <li>Added: React Helmet Async</li>
              <li>Added: Redux Toolkit</li>
              <li>Added: Notyf notifications</li>
              <li>Added: Yup validation</li>
              <li>Added: Multiple documentation pages</li>
              <li>Migrated: All components to React Hooks</li>
              <li>Removed: Redux Toastr</li>
              <li>Removed: Smart Wizard</li>
              <li>Updated: Bootstrap 5.1.1</li>
              <li>Updated: React v17</li>
              <li>Updated: React Router DOM v6</li>
              <li>Updated: Dependencies to latest versions</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Changelog;
