import { TestBed} from '@angular/core/testing';
import { AlumnoService } from './alumno.service';


describe('AlumnosService', () => {
  let service: AlumnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnoService);
  });

  it('should be create', () => { 
    expect(service).toBeTruthy();
  });

});