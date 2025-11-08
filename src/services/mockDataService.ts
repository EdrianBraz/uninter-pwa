import type { Student } from '../types/Student';
import type { LiveClass } from '../types/LiveClass';
import type { AgendaEvent } from '../types/Agenda';
import type { Message } from '../types/Message';
import type { Course } from '../types/Course';
import type { Discipline } from '../types/Discipline';

interface ProfileIndexItem {
  ru: string;
  name: string;
  password: string;
  filename: string;
}

interface ProfileIndex {
  profiles: ProfileIndexItem[];
}

class MockDataService {
  private baseUrl = '/mock';

  /**
   * Carrega o índice de perfis disponíveis
   */
  async getProfileIndex(): Promise<ProfileIndex> {
    const response = await fetch(`${this.baseUrl}/students/profile_index.json`);
    if (!response.ok) throw new Error('Failed to load profile index');
    return response.json();
  }

  /**
   * Carrega dados completos de um aluno pelo RU
   * Este é o único fetch de dados do aluno - todos os dados estão em um único JSON
   */
  async getStudentByRU(ru: string): Promise<Student | null> {
    try {
      const response = await fetch(`${this.baseUrl}/students/${ru}.json`);
      if (!response.ok) return null;
      return response.json();
    } catch (error) {
      console.error('Error loading student data:', error);
      return null;
    }
  }

  /**
   * Carrega todos os perfis de alunos disponíveis
   */
  async getAllStudents(): Promise<Student[]> {
    try {
      const index = await this.getProfileIndex();
      const students = await Promise.all(
        index.profiles.map(profile => this.getStudentByRU(profile.ru))
      );
      return students.filter((s): s is Student => s !== null);
    } catch (error) {
      console.error('Error loading all students:', error);
      return [];
    }
  }

  /**
   * Retorna as aulas ao vivo do aluno
   * Método síncrono - lê do objeto Student em memória
   */
  getLiveClasses(student: Student): LiveClass[] {
    return student.liveClasses || [];
  }

  /**
   * Retorna os eventos da agenda do aluno
   * Método síncrono - lê do objeto Student em memória
   */
  getAgendaEvents(student: Student): AgendaEvent[] {
    return student.agendaEvents || [];
  }

  /**
   * Retorna as mensagens do aluno
   * Método síncrono - lê do objeto Student em memória
   */
  getMessages(student: Student): Message[] {
    return student.messages || [];
  }

  /**
   * Retorna detalhes de um curso específico
   * Método síncrono - lê do objeto Student em memória
   */
  getCourseDetails(student: Student, courseId: string): Course | null {
    return student.course.id === courseId ? student.course : null;
  }

  /**
   * Retorna detalhes de uma disciplina específica
   * Método síncrono - lê do objeto Student em memória
   */
  getDisciplineDetails(student: Student, disciplineId: string): Discipline | null {
    return student.course.disciplines.find(d => d.id === disciplineId) || null;
  }
}

// Exporta instância singleton do serviço
export const mockDataService = new MockDataService();
